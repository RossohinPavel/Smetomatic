from collections.abc import Sequence
from datetime import datetime

from sqlalchemy import Row, asc, desc, func, select, update

from src.models import Estimate
from src.orm._base import BaseRepository
from src.schemas import EstimatesRequestQuerySchema, UpdateEstimateSchema


class EstimateRepository(BaseRepository):
    """Репозиторий для работы с запросами к таблице Estimate"""

    async def create_estimate(self, user_id: int, title: str) -> Estimate:
        """Создание сметы"""
        estimate = Estimate(title=title, user_id=user_id)
        self.session.add(estimate)
        await self.session.commit()
        return estimate

    async def update_estimate(
        self, estimate_id: int, user_id: int, estimate: UpdateEstimateSchema
    ) -> int:
        """Обновление сметы в базе данных. Возвращает количество обновленных строк."""
        stmt = (
            update(Estimate)
            .where(Estimate.id == estimate_id)
            .where(Estimate.user_id == user_id)
            .values(**estimate.get_initialized_fields())
        )
        result = await self.session.execute(stmt)
        await self.session.commit()
        return result.rowcount  # type: ignore

    async def get_estimate(self, estimate_id: int, user_id: int) -> Estimate | None:
        """Получение сметы по ид."""
        stmt = select(Estimate).where(Estimate.id == estimate_id).where(Estimate.user_id == user_id)
        return await self.session.scalar(stmt)

    async def get_estimates(
        self, user_id: int, q: EstimatesRequestQuerySchema
    ) -> Sequence[Row[tuple[int, str, datetime]]]:
        """Получение списка информаций по сметам."""
        order = asc if q.order == "asc" else desc
        stmt = (
            select(Estimate.id, Estimate.title, Estimate.updated_at)
            .where(Estimate.user_id == user_id)
            .order_by(order(Estimate.updated_at))
            .limit(q.limit)
            .offset(q.offset)
        )
        result = await self.session.execute(stmt)
        return result.all()

    async def get_estimates_count(self, user_id: int) -> int:
        """Получаем количество смет пользователя."""
        stmt = select(func.count()).select_from(Estimate).where(Estimate.user_id == user_id)
        result = await self.session.scalar(stmt)
        return 0 if result is None else result

    async def renew_estimate_updated_at(self, estimate_id: int, user_id: int):
        """Обновляет время обновления сметы."""
        stmt = (
            update(Estimate)
            .where(Estimate.id == estimate_id)
            .where(Estimate.user_id == user_id)
            .values(updated_at=func.now())
        )
        result = await self.session.execute(stmt)
        return result
