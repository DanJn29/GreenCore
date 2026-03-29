"""Rebuild transactions with product_id and pending status."""
from __future__ import annotations

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "0002_tx_product_pending"
down_revision = "0001_initial_schema"
branch_labels = None
depends_on = None

old_transaction_status_enum = postgresql.ENUM(
    "accepted",
    "harvesting",
    "packaging",
    "on_the_way",
    "canceled",
    name="transaction_status",
    create_type=False,
)
new_transaction_status_enum = postgresql.ENUM(
    "pending",
    "accepted",
    "harvesting",
    "packaging",
    "on_the_way",
    "canceled",
    name="transaction_status",
    create_type=False,
)
temporary_transaction_status_enum = postgresql.ENUM(
    "pending",
    "accepted",
    "harvesting",
    "packaging",
    "on_the_way",
    "canceled",
    name="transaction_status_new",
    create_type=False,
)


def upgrade() -> None:
    bind = op.get_bind()

    op.drop_index("ix_transactions_user_id", table_name="transactions")
    op.drop_table("transactions")

    temporary_transaction_status_enum.create(bind, checkfirst=True)
    old_transaction_status_enum.drop(bind, checkfirst=False)
    op.execute("ALTER TYPE transaction_status_new RENAME TO transaction_status")

    op.create_table(
        "transactions",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("product_id", sa.Integer(), nullable=False),
        sa.Column("quantity", sa.Double(), nullable=False),
        sa.Column("total", sa.Double(), nullable=False),
        sa.Column("paid", sa.Double(), nullable=False, server_default=sa.text("0")),
        sa.Column("debt", sa.Double(), nullable=False),
        sa.Column(
            "status",
            new_transaction_status_enum,
            nullable=False,
            server_default=sa.text("'pending'"),
        ),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["product_id"], ["products.id"], ondelete="CASCADE"),
    )
    op.create_index("ix_transactions_user_id", "transactions", ["user_id"], unique=False)
    op.create_index("ix_transactions_product_id", "transactions", ["product_id"], unique=False)


def downgrade() -> None:
    bind = op.get_bind()

    op.drop_index("ix_transactions_product_id", table_name="transactions")
    op.drop_index("ix_transactions_user_id", table_name="transactions")
    op.drop_table("transactions")

    postgresql.ENUM(
        "accepted",
        "harvesting",
        "packaging",
        "on_the_way",
        "canceled",
        name="transaction_status_old",
        create_type=False,
    ).create(bind, checkfirst=True)
    new_transaction_status_enum.drop(bind, checkfirst=False)
    op.execute("ALTER TYPE transaction_status_old RENAME TO transaction_status")

    op.create_table(
        "transactions",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("product", sa.String(length=255), nullable=False),
        sa.Column("quantity", sa.Double(), nullable=False),
        sa.Column("total", sa.Double(), nullable=False),
        sa.Column("paid", sa.Double(), nullable=False),
        sa.Column("debt", sa.Double(), nullable=False),
        sa.Column("status", old_transaction_status_enum, nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
    )
    op.create_index("ix_transactions_user_id", "transactions", ["user_id"], unique=False)
