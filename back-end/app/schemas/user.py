from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

from app.models.enums import UserRole
from app.schemas.validators import (
    normalize_email,
    validate_password,
    validate_phone_number,
    validate_trimmed_text,
)


class UserBase(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=20)
    company_name: str = Field(min_length=1, max_length=255)

    @field_validator("name", "company_name")
    @classmethod
    def validate_text_fields(cls, value: str) -> str:
        return validate_trimmed_text(value, "Field")

    @field_validator("email")
    @classmethod
    def normalize_email_value(cls, value: EmailStr) -> str:
        return normalize_email(str(value))

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        return validate_phone_number(value)


class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=128)

    @field_validator("password")
    @classmethod
    def validate_password_value(cls, value: str) -> str:
        return validate_password(value)


class UserUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=255)
    email: EmailStr | None = None
    phone: str | None = Field(default=None, min_length=7, max_length=20)
    company_name: str | None = Field(default=None, min_length=1, max_length=255)
    password: str | None = Field(default=None, min_length=8, max_length=128)

    @field_validator("name", "company_name")
    @classmethod
    def validate_text_fields(cls, value: str | None) -> str | None:
        if value is None:
            return None
        return validate_trimmed_text(value, "Field")

    @field_validator("email")
    @classmethod
    def normalize_email_value(cls, value: EmailStr | None) -> str | None:
        if value is None:
            return None
        return normalize_email(str(value))

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str | None) -> str | None:
        if value is None:
            return None
        return validate_phone_number(value)

    @field_validator("password")
    @classmethod
    def validate_password_value(cls, value: str | None) -> str | None:
        if value is None:
            return None
        return validate_password(value)


class UserRead(UserBase):
    id: int
    role: UserRole

    model_config = ConfigDict(from_attributes=True)


class UserResponse(UserRead):
    pass
