from fastapi import APIRouter

from app.api.routes.admin_booking import router as admin_booking_router
from app.api.routes.admin_finances import router as admin_finances_router
from app.api.routes.admin_partners import router as admin_partners_router
from app.api.routes.admin_products import router as admin_products_router
from app.api.routes.admin_tourism import router as admin_tourism_router
from app.api.routes.admin_transactions import router as admin_transactions_router
from app.api.routes.auth import router as auth_router
from app.api.routes.booking import router as booking_router
from app.api.routes.finances import router as finances_router
from app.api.routes.products import router as products_router
from app.api.routes.transactions import router as transactions_router

api_router = APIRouter()
api_router.include_router(admin_booking_router)
api_router.include_router(admin_finances_router)
api_router.include_router(admin_partners_router)
api_router.include_router(admin_products_router)
api_router.include_router(admin_tourism_router)
api_router.include_router(admin_transactions_router)
api_router.include_router(auth_router)
api_router.include_router(booking_router)
api_router.include_router(finances_router)
api_router.include_router(products_router)
api_router.include_router(transactions_router)
