from pydantic import BaseModel


class FinanceSummaryItem(BaseModel):
    product_id: int
    product_type: str
    quantity: float
    total: float
    paid: float
    debt: float


class FinanceSummaryResponse(BaseModel):
    user_name: str
    user_email: str
    summaries: list[FinanceSummaryItem]


class AdminFinanceSummaryResponse(BaseModel):
    admin_name: str
    admin_email: str
    summaries: list[FinanceSummaryItem]
