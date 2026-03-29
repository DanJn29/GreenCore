from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.crud.booked_users import create_booked_user
from app.schemas.booked_user import BookedUserCreate, BookedUserRead

router = APIRouter(prefix="/greencore/book", tags=["bookings"])


@router.post("", response_model=BookedUserRead, status_code=status.HTTP_201_CREATED)
def create_booking(
    payload: BookedUserCreate,
    db: Annotated[Session, Depends(get_db)],
) -> BookedUserRead:
    return BookedUserRead.model_validate(
        create_booked_user(db, payload),
        from_attributes=True,
    )
