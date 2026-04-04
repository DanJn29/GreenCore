from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models.enums import TransactionStatus
from app.models.product import Product
from app.models.transaction import Transaction
from app.models.user import User
from app.schemas.transaction import AdminTransactionUpdate, TransactionCreate


def get_user_transaction(db: Session, current_user: User, transaction_id: int) -> Transaction:
    statement = (
        select(Transaction)
        .options(selectinload(Transaction.product))
        .where(
            Transaction.id == transaction_id,
            Transaction.user_id == current_user.id,
        )
    )
    transaction = db.scalar(statement)
    if transaction is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found.",
        )
    return transaction


def create_transaction(db: Session, current_user: User, payload: TransactionCreate) -> Transaction:
    product = db.get(Product, payload.product_id)
    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found.",
        )

    if payload.quantity > product.quantity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Requested quantity exceeds available product quantity.",
        )

    total = payload.quantity * product.price
    transaction = Transaction(
        user_id=current_user.id,
        product_id=product.id,
        quantity=payload.quantity,
        total=total,
        paid=0,
        debt=total,
        status=TransactionStatus.pending,
    )

    product.quantity -= payload.quantity
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return get_user_transaction(db, current_user, transaction.id)


def list_user_transactions(db: Session, current_user: User) -> list[Transaction]:
    statement = (
        select(Transaction)
        .options(selectinload(Transaction.product))
        .where(Transaction.user_id == current_user.id)
        .order_by(Transaction.id.desc())
    )
    return list(db.scalars(statement).all())


def list_all_transactions_for_admin(db: Session) -> list[Transaction]:
    statement = (
        select(Transaction)
        .options(
            selectinload(Transaction.product),
            selectinload(Transaction.user),
        )
        .order_by(Transaction.id.desc())
    )
    return list(db.scalars(statement).all())


def get_transaction_for_admin(db: Session, transaction_id: int) -> Transaction:
    statement = (
        select(Transaction)
        .options(
            selectinload(Transaction.product),
            selectinload(Transaction.user),
        )
        .where(Transaction.id == transaction_id)
    )
    transaction = db.scalar(statement)
    if transaction is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found.",
        )
    return transaction


def update_transaction_for_admin(
    db: Session,
    transaction_id: int,
    payload: AdminTransactionUpdate,
) -> Transaction:
    transaction = get_transaction_for_admin(db, transaction_id)
    updates = payload.model_dump(exclude_unset=True)

    if "status" in updates:
        transaction.status = updates["status"]

    if "paid" in updates:
        transaction.paid = updates["paid"]
        transaction.debt = max(transaction.total - transaction.paid, 0)

    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return get_transaction_for_admin(db, transaction_id)


def update_transaction(
    db: Session,
    current_user: User,
    transaction_id: int,
    payload: TransactionCreate,
) -> Transaction:
    transaction = get_user_transaction(db, current_user, transaction_id)
    current_product = db.get(Product, transaction.product_id)
    if current_product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found.",
        )

    if payload.product_id == transaction.product_id:
        available_quantity = current_product.quantity + transaction.quantity
        if payload.quantity > available_quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Requested quantity exceeds available product quantity.",
            )
        current_product.quantity = available_quantity - payload.quantity
        target_product = current_product
    else:
        target_product = db.get(Product, payload.product_id)
        if target_product is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found.",
            )
        if payload.quantity > target_product.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Requested quantity exceeds available product quantity.",
            )
        current_product.quantity += transaction.quantity
        target_product.quantity -= payload.quantity

    transaction.product_id = target_product.id
    transaction.quantity = payload.quantity
    transaction.total = payload.quantity * target_product.price
    transaction.debt = max(transaction.total - transaction.paid, 0)

    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return get_user_transaction(db, current_user, transaction.id)


def delete_transaction(db: Session, current_user: User, transaction_id: int) -> None:
    transaction = get_user_transaction(db, current_user, transaction_id)
    if transaction.status != TransactionStatus.pending:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only pending transactions can be deleted.",
        )

    product = db.get(Product, transaction.product_id)
    if product is not None:
        product.quantity += transaction.quantity

    db.delete(transaction)
    db.commit()
