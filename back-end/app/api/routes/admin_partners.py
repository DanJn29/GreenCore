from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.core.database import get_db
from app.crud.users import list_partners_for_admin
from app.models.user import User
from app.schemas.user import AdminPartnerListResponse, AdminPartnerRead

router = APIRouter(prefix="/greencore/admin/partners", tags=["admin"])


@router.get("", response_model=AdminPartnerListResponse)
def list_admin_partners(
    db: Annotated[Session, Depends(get_db)],
    current_admin: Annotated[User, Depends(get_current_admin)],
) -> AdminPartnerListResponse:
    return AdminPartnerListResponse(
        admin_name=current_admin.name,
        admin_email=current_admin.email,
        partners=[
            AdminPartnerRead.model_validate(item, from_attributes=True)
            for item in list_partners_for_admin(db)
        ],
    )
