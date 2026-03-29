from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.core.database import get_db
from app.crud.transactions import (
    list_all_transactions_for_admin,
    update_transaction_for_admin,
)
from app.models.user import User
from app.schemas.transaction import (
    AdminTransactionListResponse,
    AdminTransactionRead,
    AdminTransactionUpdate,
)

router = APIRouter(prefix="/greencore/admin/transactions", tags=["admin"])


@router.get("", response_model=AdminTransactionListResponse)
def list_admin_transactions(
    db: Annotated[Session, Depends(get_db)],
    current_admin: Annotated[User, Depends(get_current_admin)],
) -> AdminTransactionListResponse:
    return AdminTransactionListResponse(
        admin_name=current_admin.name,
        admin_email=current_admin.email,
        transactions=[
            AdminTransactionRead.model_validate(item, from_attributes=True)
            for item in list_all_transactions_for_admin(db)
        ],
    )


@router.patch("/{transaction_id}", response_model=AdminTransactionRead)
def patch_admin_transaction(
    transaction_id: int,
    payload: AdminTransactionUpdate,
    db: Annotated[Session, Depends(get_db)],
    current_admin: Annotated[User, Depends(get_current_admin)],
) -> AdminTransactionRead:
    return AdminTransactionRead.model_validate(
        update_transaction_for_admin(db, transaction_id, payload),
        from_attributes=True,
    )
