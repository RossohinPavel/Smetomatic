from sqlalchemy import func, insert, literal, select

from src.models import Estimate, Section
from src.orm._base import BaseRepository
from src.schemas import CreateSectionSchema

from .estimate import EstimateRepository


class SectionRepository(BaseRepository):
    """Репозиторий для работы с запросами к таблице Section"""

    async def create_section(self, user_id: int, data: CreateSectionSchema) -> Section | None:
        """Создаем раздел сметы"""
        subquery = (
            select(
                Estimate.id,
                literal(data.title),
                (
                    select(func.count())
                    .select_from(Section)
                    .where(Section.estimate_id == data.estimate_id)
                    .scalar_subquery()
                ),
            )
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
