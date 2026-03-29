from __future__ import annotations

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.product import Product
from app.models.transaction import Transaction
from app.models.user import User
from app.schemas.finance import FinanceSummaryItem


def get_user_finance_summaries(db: Session, current_user: User) -> list[FinanceSummaryItem]:
    statement = (
        select(
            Product.id.label("product_id"),
            Product.product_type.label("product_type"),
            func.coalesce(func.sum(Transaction.quantity), 0.0).label("quantity"),
            func.coalesce(func.sum(Transaction.total), 0.0).label("total"),
            func.coalesce(func.sum(Transaction.paid), 0.0).label("paid"),
            func.coalesce(func.sum(Transaction.debt), 0.0).label("debt"),
        )
        .join(Product, Product.id == Transaction.product_id)
        .where(Transaction.user_id == current_user.id)
        .group_by(Product.id, Product.product_type)
        .order_by(Product.product_type.asc(), Product.id.asc())
    )

    rows = db.execute(statement).all()
    return [
        FinanceSummaryItem(
            product_id=row.product_id,
            product_type=row.product_type,
            quantity=float(row.quantity),
            total=float(row.total),
            paid=float(row.paid),
            debt=float(row.debt),
        )
        for row in rows
    ]


def get_admin_finance_summaries(db: Session) -> list[FinanceSummaryItem]:
    statement = (
        select(
            Product.id.label("product_id"),
            Product.product_type.label("product_type"),
            func.coalesce(func.sum(Transaction.quantity), 0.0).label("quantity"),
            func.coalesce(func.sum(Transaction.total), 0.0).label("total"),
            func.coalesce(func.sum(Transaction.paid), 0.0).label("paid"),
            func.coalesce(func.sum(Transaction.debt), 0.0).label("debt"),
        )
        .join(Product, Product.id == Transaction.product_id)
        .group_by(Product.id, Product.product_type)
        .order_by(Product.product_type.asc(), Product.id.asc())
    )

    rows = db.execute(statement).all()
    return [
        FinanceSummaryItem(
            product_id=row.product_id,
            product_type=row.product_type,
            quantity=float(row.quantity),
            total=float(row.total),
            paid=float(row.paid),
            debt=float(row.debt),
        )
        for row in rows
    ]
