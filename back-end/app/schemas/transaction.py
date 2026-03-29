from pydantic import BaseModel, ConfigDict, Field

from app.models.enums import TransactionStatus


class TransactionBase(BaseModel):
    product_id: int = Field(ge=1)
    quantity: float = Field(gt=0)


class TransactionCreate(TransactionBase):
    pass


class TransactionRead(BaseModel):
    id: int
    user_id: int
    product_id: int
    product_type: str
    quantity: float
    total: float
    paid: float
    debt: float
    status: TransactionStatus

    model_config = ConfigDict(from_attributes=True)


class TransactionListResponse(BaseModel):
    user_name: str
    user_email: str
    transactions: list[TransactionRead]


class AdminTransactionRead(BaseModel):
    transaction_id: int
    user_id: int
    company_name: str
    user_name: str
    product_id: int
    product_type: str
    quantity: float
    total: float
    paid: float
    debt: float
    status: TransactionStatus

    model_config = ConfigDict(from_attributes=True)


class AdminTransactionUpdate(BaseModel):
    status: TransactionStatus | None = None
    paid: float | None = Field(default=None, ge=0)


class AdminTransactionListResponse(BaseModel):
    admin_name: str
    admin_email: str
    transactions: list[AdminTransactionRead]
