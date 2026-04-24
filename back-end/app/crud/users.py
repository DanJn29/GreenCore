from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.enums import UserRole
from app.models.user import User


def list_partners_for_admin(db: Session) -> list[User]:
    statement = select(User).where(User.role == UserRole.user).order_by(User.id.asc())
    return list(db.scalars(statement).all())
