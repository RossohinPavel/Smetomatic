from sqlalchemy import delete, insert, literal, select, update

from src.models import Estimate, Section
from src.orm._base import BaseRepository
from src.schemas import CreateSectionSchema, UpdateSectionSchema

from .estimate import EstimateRepository


class SectionRepository(BaseRepository):
    """Репозиторий для работы с запросами к таблице Section"""

    async def create_section(self, user_id: int, data: CreateSectionSchema) -> Section | None:
        """Создаем раздел сметы"""
        subquery = (
            select(Estimate.id, literal(data.title), literal(data.sort_index))
            .select_from(Estimate)
            .where(Estimate.user_id == user_id)
            .where(Estimate.id == data.estimate_id)
        )
        stmt = (
            insert(Section)
            .from_select(["estimate_id", "title", "sort_index"], subquery)
            .returning(Section)
        )
        result = await self.session.execute(stmt)
        section = result.scalar()
        if section is not None:
            estimate_repo = EstimateRepository(self.session)
            await estimate_repo.renew_estimate_updated_at(data.estimate_id, user_id)
            await self.session.commit()
        return section

    async def delete_section(self, user_id: int, section_id: int) -> int:
        """Удаление раздела сметы"""
        stmt = (
            delete(Section)
            .where(Section.id == section_id)
            .where(Section.estimate_id == Estimate.id)
            .where(Estimate.user_id == user_id)
        )
        result = await self.session.execute(stmt)
        rowcount: int = result.rowcount  # type: ignore
        if rowcount > 0:
            await self.session.commit()
        return rowcount

    async def update_section(self, user_id: int, section_id: int, data: UpdateSectionSchema) -> int:
        """Обновление раздела сметы"""
        stmt = (
            update(Section)
            .where(Section.id == section_id)
            .where(Section.estimate_id == Estimate.id)
            .where(Estimate.user_id == user_id)
            .values(**data.get_initialized_fields())
        )
        result = await self.session.execute(stmt)
        rowcount: int = result.rowcount  # type: ignore
        if rowcount > 0:
            await self.session.commit()
        return rowcount
