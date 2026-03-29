from __future__ import annotations

import re

PHONE_PATTERN = re.compile(r"^\+?[0-9][0-9()\-\s]{6,19}$")


def validate_trimmed_text(value: str, field_name: str) -> str:
    normalized = value.strip()
    if not normalized:
        raise ValueError(f"{field_name} must not be empty.")
    return normalized


def normalize_email(value: str) -> str:
    return value.strip().lower()


def validate_phone_number(value: str) -> str:
    normalized = value.strip()
    if not PHONE_PATTERN.fullmatch(normalized):
        raise ValueError("Phone must be a valid phone number.")
    return normalized


def validate_password(value: str) -> str:
    if not value.strip():
        raise ValueError("Password must not be empty.")
    return value
