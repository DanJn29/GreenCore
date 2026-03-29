from __future__ import annotations

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import create_access_token, get_password_hash, verify_password
from app.models.enums import UserRole
from app.models.product import Product
from app.models.user import User
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse
from app.schemas.user import UserUpdate


def create_user(db: Session, payload: RegisterRequest) -> User:
    existing_user = db.scalar(select(User).where(User.email == payload.email))
    if existing_user is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with this email already exists.",
        )

    user = User(
        name=payload.name,
        email=payload.email,
        password=get_password_hash(payload.password),
        phone=payload.phone,
        company_name=payload.company_name,
        role=UserRole.user,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def login_user(db: Session, payload: LoginRequest) -> TokenResponse:
    user = db.scalar(select(User).where(User.email == payload.email))
    if user is None or not verify_password(payload.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(subject=user.id)
    return TokenResponse(access_token=access_token, role=user.role)


def update_user(db: Session, current_user: User, payload: UserUpdate) -> User:
    updates = payload.model_dump(exclude_unset=True)

    if "email" in updates and updates["email"] != current_user.email:
        existing_user = db.scalar(select(User).where(User.email == updates["email"]))
        if existing_user is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="User with this email already exists.",
            )

    password = updates.pop("password", None)
    for field, value in updates.items():
        setattr(current_user, field, value)

    if password is not None:
        current_user.password = get_password_hash(password)

    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user


def delete_user(db: Session, current_user: User) -> None:
    for transaction in current_user.transactions:
        product = db.get(Product, transaction.product_id)
        if product is not None:
            product.quantity += transaction.quantity

    db.delete(current_user)
    db.commit()
