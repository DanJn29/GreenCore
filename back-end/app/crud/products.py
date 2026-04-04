from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product import AdminProductUpdate, ProductCreate


def create_product_for_admin(db: Session, payload: ProductCreate) -> Product:
    product = Product(
        product_type=payload.product_type,
        quantity=payload.quantity,
        price=payload.price,
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def list_all_products_for_admin(db: Session) -> list[Product]:
    statement = select(Product).order_by(Product.id.asc())
    return list(db.scalars(statement).all())


def list_available_products_for_user(db: Session) -> list[Product]:
    statement = select(Product).where(Product.quantity > 0).order_by(Product.id.asc())
    return list(db.scalars(statement).all())


def get_product_for_admin(db: Session, product_id: int) -> Product:
    product = db.get(Product, product_id)
    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found.",
        )
    return product


def update_product_for_admin(db: Session, product_id: int, payload: AdminProductUpdate) -> Product:
    product = get_product_for_admin(db, product_id)
    updates = payload.model_dump(exclude_unset=True)

    for field, value in updates.items():
        setattr(product, field, value)

    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def delete_product_for_admin(db: Session, product_id: int) -> None:
    product = get_product_for_admin(db, product_id)
    db.delete(product)
    db.commit()
