from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

from app.schemas.validators import validate_trimmed_text


class ProductBase(BaseModel):
    product_type: str = Field(min_length=1, max_length=255)
    quantity: float = Field(ge=0)
    price: float = Field(ge=0)

    @field_validator("product_type")
    @classmethod
    def validate_product_type(cls, value: str) -> str:
        return validate_trimmed_text(value, "Product type")


class ProductCreate(ProductBase):
    @model_validator(mode="before")
    @classmethod
    def validate_required_fields(cls, value: object) -> object:
        if not isinstance(value, dict):
            return value

        raw_product_type = value.get("product_type")
        if raw_product_type is None or (isinstance(raw_product_type, str) and not raw_product_type.strip()):
            raise ValueError("Product type is required.")

        raw_quantity = value.get("quantity")
        if raw_quantity is None or (isinstance(raw_quantity, str) and not raw_quantity.strip()):
            raise ValueError("Quantity is required.")

        raw_price = value.get("price")
        if raw_price is None or (isinstance(raw_price, str) and not raw_price.strip()):
            raise ValueError("Price is required.")

        return value


class ProductRead(ProductBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class UserProductRead(BaseModel):
    product_id: int
    product_type: str

    model_config = ConfigDict(from_attributes=True)


class AdminProductRead(BaseModel):
    product_id: int
    product_type: str
    quantity: float
    price: float

    model_config = ConfigDict(from_attributes=True)


class AdminProductListResponse(BaseModel):
    admin_name: str
    admin_email: str
    products: list[AdminProductRead]


class AdminProductDeleteResponse(BaseModel):
    status: str
    message: str


class AdminProductUpdate(BaseModel):
    product_type: str | None = Field(default=None, min_length=1, max_length=255)
    quantity: float | None = Field(default=None, ge=0)
    price: float | None = Field(default=None, ge=0)

    @field_validator("product_type")
    @classmethod
    def validate_product_type_value(cls, value: str | None) -> str | None:
        if value is None:
            return None
        return validate_trimmed_text(value, "Product type")
