from enum import Enum


class UserRole(str, Enum):
    admin = "admin"
    user = "user"


class TransactionStatus(str, Enum):
    pending = "pending"
    accepted = "accepted"
    harvesting = "harvesting"
    packaging = "packaging"
    on_the_way = "on_the_way"
    canceled = "canceled"
