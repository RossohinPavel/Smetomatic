from fastapi import APIRouter, Depends, HTTPException

from src.api.middleware import validate_token
from src.core import get_base_session
from src.orm import SectionRepository
from src.schemas import CreateSectionSchema, SectionSchema, TokenDataSchema


router = APIRouter(prefix="/section", tags=["Estimate"])


@router.post("/", status_code=201, response_model=SectionSchema)
async def create_section(
    data: CreateSectionSchema,
    token: TokenDataSchema = Depends(validate_token()),
    session=Depends(get_base_session),
):
    """Создаем раздел сметы"""
    repo = SectionRepository(session)
    section = await repo.create_section(token.user_id, data)
    if section is None:
        raise HTTPException(400)
    return section
