from fastapi import FastAPI

from app.api.routes import api_router
from app.core.config import settings


def create_application() -> FastAPI:
    application = FastAPI(title=settings.app_name)
    application.include_router(api_router)
    return application


app = create_application()
