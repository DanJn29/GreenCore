from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.crud.transactions import (
    create_transaction as create_transaction_crud,
    delete_transaction as delete_transaction_crud,
    get_user_transaction,
    list_user_transactions,
    update_transaction as update_transaction_crud,
)
from app.models.transaction import Transaction
from app.models.user import User
from app.schemas.transaction import TransactionCreate, TransactionListResponse, TransactionRead

router = APIRouter(prefix="/greencore/transactions", tags=["transactions"])


@router.post("", response_model=TransactionRead, status_code=status.HTTP_201_CREATED)
def create_transaction(
    payload: TransactionCreate,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> Transaction:
    return create_transaction_crud(db, current_user, payload)


@router.get("", response_model=TransactionListResponse)
def list_transactions(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> TransactionListResponse:
    return TransactionListResponse(
        user_name=current_user.name,
        user_email=current_user.email,
        transactions=[
            TransactionRead.model_validate(item, from_attributes=True)
            for item in list_user_transactions(db, current_user)
        ],
    )


@router.get("/{transaction_id}", response_model=TransactionRead)
def get_transaction(
    transaction_id: int,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> Transaction:
    return get_user_transaction(db, current_user, transaction_id)


@router.put("/{transaction_id}", response_model=TransactionRead)
def update_transaction(
    transaction_id: int,
    payload: TransactionCreate,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> Transaction:
    return update_transaction_crud(db, current_user, transaction_id, payload)


@router.delete("/{transaction_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_transaction(
    transaction_id: int,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> Response:
    delete_transaction_crud(db, current_user, transaction_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
