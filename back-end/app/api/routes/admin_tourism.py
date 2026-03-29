from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.core.database import get_db
from app.crud.booked_users import list_booked_users_for_admin
from app.models.user import User
from app.schemas.booked_user import AdminBookedUserRead, AdminTourismListResponse

router = APIRouter(prefix="/greencore/admin/tourism", tags=["admin"])


@router.get("", response_model=AdminTourismListResponse)
def list_admin_tourism(
    db: Annotated[Session, Depends(get_db)],
    current_admin: Annotated[User, Depends(get_current_admin)],
) -> AdminTourismListResponse:
    return AdminTourismListResponse(
        admin_name=current_admin.name,
        admin_email=current_admin.email,
        booked_users=[
            AdminBookedUserRead.model_validate(item, from_attributes=True)
            for item in list_booked_users_for_admin(db)
        ],
    )
