"""Create initial GreenCore schema."""
from __future__ import annotations

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "0001_initial_schema"
down_revision = None
branch_labels = None
depends_on = None

user_role_enum = postgresql.ENUM("admin", "user", name="user_role", create_type=False)
transaction_status_enum = postgresql.ENUM(
    "accepted",
    "harvesting",
    "packaging",
    "on_the_way",
    "canceled",
    name="transaction_status",
    create_type=False,
)


def upgrade() -> None:
    bind = op.get_bind()
    user_role_enum.create(bind, checkfirst=True)
    transaction_status_enum.create(bind, checkfirst=True)

    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("password", sa.String(length=255), nullable=False),
        sa.Column("phone", sa.String(length=32), nullable=False),
        sa.Column("company_name", sa.String(length=255), nullable=False),
        sa.Column("role", user_role_enum, nullable=False),
        sa.UniqueConstraint("email", name="uq_users_email"),
    )
    op.create_index("ix_users_email", "users", ["email"], unique=False)

    op.create_table(
        "products",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("product_type", sa.String(length=255), nullable=False),
        sa.Column("quantity", sa.Double(), nullable=False),
        sa.Column("price", sa.Double(), nullable=False),
    )

    op.create_table(
        "BookedUsers",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("phone", sa.String(length=32), nullable=False),
        sa.Column("visit_date", sa.DateTime(timezone=True), nullable=False),
    )

    op.create_table(
        "transactions",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("product", sa.String(length=255), nullable=False),
        sa.Column("quantity", sa.Double(), nullable=False),
        sa.Column("total", sa.Double(), nullable=False),
        sa.Column("paid", sa.Double(), nullable=False),
        sa.Column("debt", sa.Double(), nullable=False),
        sa.Column("status", transaction_status_enum, nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
    )
    op.create_index("ix_transactions_user_id", "transactions", ["user_id"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_transactions_user_id", table_name="transactions")
    op.drop_table("transactions")
    op.drop_table("BookedUsers")
    op.drop_table("products")
    op.drop_index("ix_users_email", table_name="users")
    op.drop_table("users")

    bind = op.get_bind()
    transaction_status_enum.drop(bind, checkfirst=True)
    user_role_enum.drop(bind, checkfirst=True)
