from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.schemas.validators import validate_phone_number, validate_trimmed_text


class BookedUserBase(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    phone: str = Field(min_length=7, max_length=20)
    visit_date: datetime

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        return validate_trimmed_text(value, "Name")

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        return validate_phone_number(value)


class BookedUserCreate(BookedUserBase):
    pass


class BookedUserRead(BookedUserBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class AdminBookedUserRead(BaseModel):
    id: int
    name: str
    phone: str
    visit_date: datetime

    model_config = ConfigDict(from_attributes=True)


class AdminTourismListResponse(BaseModel):
    admin_name: str
    admin_email: str
    booked_users: list[AdminBookedUserRead]


class AdminBookedUserDeleteResponse(BaseModel):
    status: str
    message: str
