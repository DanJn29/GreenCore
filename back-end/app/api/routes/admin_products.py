from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.core.database import get_db
from app.crud.products import (
    create_product_for_admin,
    delete_product_for_admin,
    list_all_products_for_admin,
    update_product_for_admin,
)
from app.models.user import User
from app.schemas.product import (
    AdminProductDeleteResponse,
    AdminProductListResponse,
    AdminProductRead,
    AdminProductUpdate,
    ProductCreate,
)

router = APIRouter(prefix="/greencore/admin/products", tags=["admin"])


@router.post("", response_model=AdminProductRead, status_code=status.HTTP_201_CREATED)
def create_admin_product(
    payload: ProductCreate,
    db: Annotated[Session, Depends(get_db)],
    current_admin: Annotated[User, Depends(get_current_admin)],
) -> AdminProductRead:
    return AdminProductRead.model_validate(
        create_product_for_admin(db, payload),
        from_attributes=True,
    )


@router.get("", response_model=AdminProductListResponse)
def list_admin_products(
    db: Annotated[Session, Depends(get_db)],
    current_admin: Annotated[User, Depends(get_current_admin)],
) -> AdminProductListResponse:
    return AdminProductListResponse(
        admin_name=current_admin.name,
        admin_email=current_admin.email,
        products=[
            AdminProductRead.model_validate(item, from_attributes=True)
            for item in list_all_products_for_admin(db)
        ],
    )


@router.patch("/{product_id}", response_model=AdminProductRead)
def patch_admin_product(
    product_id: int,
    payload: AdminProductUpdate,
    db: Annotated[Session, Depends(get_db)],
    current_admin: Annotated[User, Depends(get_current_admin)],
) -> AdminProductRead:
    return AdminProductRead.model_validate(
        update_product_for_admin(db, product_id, payload),
        from_attributes=True,
    )


@router.delete("/{product_id}", response_model=AdminProductDeleteResponse)
def delete_admin_product(
    product_id: int,
    db: Annotated[Session, Depends(get_db)],
    current_admin: Annotated[User, Depends(get_current_admin)],
) -> AdminProductDeleteResponse:
    delete_product_for_admin(db, product_id)
    return AdminProductDeleteResponse(
        status="success",
        message="Product deleted successfully.",
    )
