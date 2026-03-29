from __future__ import annotations

from sqlalchemy import Double, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True)
    product_type: Mapped[str] = mapped_column(String(255), nullable=False)
    quantity: Mapped[float] = mapped_column(Double, nullable=False)
    price: Mapped[float] = mapped_column(Double, nullable=False)

    transactions: Mapped[list["Transaction"]] = relationship(back_populates="product")

    @property
    def product_id(self) -> int:
        return self.id
