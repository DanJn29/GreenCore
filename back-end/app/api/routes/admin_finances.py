from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin
from app.core.database import get_db
from app.crud.finances import get_admin_finance_summaries
from app.models.user import User
from app.schemas.finance import AdminFinanceSummaryResponse

router = APIRouter(prefix="/greencore/admin/finances", tags=["admin"])


@router.get("", response_model=AdminFinanceSummaryResponse)
def get_admin_finances(
    db: Annotated[Session, Depends(get_db)],
    current_admin: Annotated[User, Depends(get_current_admin)],
) -> AdminFinanceSummaryResponse:
    return AdminFinanceSummaryResponse(
        admin_name=current_admin.name,
        admin_email=current_admin.email,
        summaries=get_admin_finance_summaries(db),
    )
