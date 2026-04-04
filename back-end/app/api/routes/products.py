from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.crud.products import list_available_products_for_user
from app.models.user import User
from app.schemas.product import UserProductRead

router = APIRouter(prefix="/greencore/products", tags=["products"])


@router.get("", response_model=list[UserProductRead])
def list_user_products(
    db: Annotated[Session, Depends(get_db)],
    _current_user: Annotated[User, Depends(get_current_user)],
) -> list[UserProductRead]:
    return [
        UserProductRead.model_validate(item, from_attributes=True)
        for item in list_available_products_for_user(db)
    ]
