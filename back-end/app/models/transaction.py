from __future__ import annotations

from sqlalchemy import Double, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.enums import TransactionStatus


class Transaction(Base):
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"), index=True)
    quantity: Mapped[float] = mapped_column(Double, nullable=False)
    total: Mapped[float] = mapped_column(Double, nullable=False)
    paid: Mapped[float] = mapped_column(Double, nullable=False)
    debt: Mapped[float] = mapped_column(Double, nullable=False)
    status: Mapped[TransactionStatus] = mapped_column(
        Enum(TransactionStatus, name="transaction_status"),
        nullable=False,
        default=TransactionStatus.pending,
    )

    user: Mapped["User"] = relationship(back_populates="transactions")
    product: Mapped["Product"] = relationship(back_populates="transactions")

    @property
    def transaction_id(self) -> int:
        return self.id

    @property
    def user_name(self) -> str:
        return self.user.name

    @property
    def company_name(self) -> str:
        return self.user.company_name

    @property
    def product_type(self) -> str:
        return self.product.product_type
