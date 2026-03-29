from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.crud.finances import get_user_finance_summaries
from app.models.user import User
from app.schemas.finance import FinanceSummaryResponse

router = APIRouter(prefix="/greencore/finances", tags=["finances"])


@router.get("", response_model=FinanceSummaryResponse)
def get_finances(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> FinanceSummaryResponse:
    return FinanceSummaryResponse(
        user_name=current_user.name,
        user_email=current_user.email,
        summaries=get_user_finance_summaries(db, current_user),
    )
