from __future__ import annotations

from dataclasses import dataclass
from typing import Annotated, Any

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import decode_access_token
from app.models.enums import UserRole
from app.models.revoked_token import RevokedToken
from app.models.user import User

bearer_scheme = HTTPBearer(auto_error=False)


@dataclass
class AuthenticatedTokenContext:
    user: User
    payload: dict[str, Any]
    token: str


def _get_credentials_exception() -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials.",
        headers={"WWW-Authenticate": "Bearer"},
    )


def _resolve_authenticated_token(
    db: Session,
    credentials: HTTPAuthorizationCredentials | None,
    *,
    reject_revoked: bool,
) -> AuthenticatedTokenContext:
    credentials_exception = _get_credentials_exception()

    if credentials is None or credentials.scheme.lower() != "bearer":
        raise credentials_exception

    try:
        payload = decode_access_token(credentials.credentials)
        subject = payload.get("sub")
        user_id = int(subject)
        jti = payload.get("jti")
        exp = payload.get("exp")
        if not isinstance(jti, str) or not jti.strip():
            raise ValueError("Missing or invalid jti.")
        if not isinstance(exp, (int, float)):
            raise ValueError("Missing or invalid exp.")
    except (JWTError, TypeError, ValueError) as exc:
        raise credentials_exception from exc

    user = db.get(User, user_id)
    if user is None:
        raise credentials_exception

    if reject_revoked:
        revoked_token_id = db.scalar(select(RevokedToken.id).where(RevokedToken.jti == jti))
        if revoked_token_id is not None:
            raise credentials_exception

    return AuthenticatedTokenContext(
        user=user,
        payload=payload,
        token=credentials.credentials,
    )


def get_current_user(
    db: Annotated[Session, Depends(get_db)],
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer_scheme)],
) -> User:
    return _resolve_authenticated_token(db, credentials, reject_revoked=True).user


def get_current_logout_context(
    db: Annotated[Session, Depends(get_db)],
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer_scheme)],
) -> AuthenticatedTokenContext:
    return _resolve_authenticated_token(db, credentials, reject_revoked=False)


def get_current_admin(
    current_user: Annotated[User, Depends(get_current_user)],
) -> User:
    if current_user.role != UserRole.admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required.",
        )
    return current_user
