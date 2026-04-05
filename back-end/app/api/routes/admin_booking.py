from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.core.database import get_db
from app.crud.booked_users import delete_booked_user_for_admin
from app.models.user import User
from app.schemas.booked_user import AdminBookedUserDeleteResponse

router = APIRouter(prefix="/greencore/admin/book", tags=["admin"])


@router.delete("/{booking_id}", response_model=AdminBookedUserDeleteResponse)
def delete_admin_booking(
    booking_id: int,
    db: Annotated[Session, Depends(get_db)],
    current_admin: Annotated[User, Depends(get_current_admin)],
) -> AdminBookedUserDeleteResponse:
    delete_booked_user_for_admin(db, booking_id)
    return AdminBookedUserDeleteResponse(
        status="success",
        message="Booking deleted successfully.",
    )
