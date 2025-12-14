from fastapi import APIRouter

from .estimate import router as estimate_router
from .section import router as section_router


router = APIRouter(prefix="", tags=["Estimate"])

router.include_router(estimate_router)
router.include_router(section_router)
