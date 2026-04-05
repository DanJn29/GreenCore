from __future__ import annotations

from datetime import timedelta

from fastapi import HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.booked_user import BookedUser
from app.schemas.booked_user import BookedUserCreate

DAILY_BOOKING_LIMIT = 5


def create_booked_user(db: Session, payload: BookedUserCreate) -> BookedUser:
    day_start = payload.visit_date.replace(hour=0, minute=0, second=0, microsecond=0)
    day_end = day_start + timedelta(days=1)

    statement = select(func.count()).select_from(BookedUser).where(
        BookedUser.visit_date >= day_start,
        BookedUser.visit_date < day_end,
    )
    daily_bookings = db.scalar(statement) or 0

    if daily_bookings >= DAILY_BOOKING_LIMIT:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Booking limit for this day has been reached.",
        )

    booked_user = BookedUser(
        name=payload.name,
        phone=payload.phone,
        visit_date=payload.visit_date,
    )
    db.add(booked_user)
    db.commit()
    db.refresh(booked_user)
    return booked_user


def list_booked_users_for_admin(db: Session) -> list[BookedUser]:
    statement = select(BookedUser).order_by(BookedUser.visit_date.asc(), BookedUser.id.asc())
    return list(db.scalars(statement).all())


def get_booked_user_for_admin(db: Session, booking_id: int) -> BookedUser:
    booked_user = db.get(BookedUser, booking_id)
    if booked_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found.",
        )
    return booked_user


def delete_booked_user_for_admin(db: Session, booking_id: int) -> None:
    booked_user = get_booked_user_for_admin(db, booking_id)
    db.delete(booked_user)
    db.commit()
