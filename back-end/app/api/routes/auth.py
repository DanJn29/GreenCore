from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.crud.auth import create_user, delete_user, login_user as login_user_crud, update_user
from app.models.user import User
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse
from app.schemas.user import UserResponse, UserUpdate

router = APIRouter(prefix="/greencore", tags=["authentication"])


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register_user(
    payload: RegisterRequest,
    db: Annotated[Session, Depends(get_db)],
) -> User:
    return create_user(db, payload)


@router.post("/login", response_model=TokenResponse)
def login_user(
    payload: LoginRequest,
    db: Annotated[Session, Depends(get_db)],
) -> TokenResponse:
    return login_user_crud(db, payload)


@router.get("/me", response_model=UserResponse)
def get_current_account(
    current_user: Annotated[User, Depends(get_current_user)],
) -> User:
    return current_user


@router.put("/me", response_model=UserResponse)
def update_current_account(
    payload: UserUpdate,
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> User:
    return update_user(db, current_user, payload)


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
def delete_current_account(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_user)],
) -> Response:
    delete_user(db, current_user)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
