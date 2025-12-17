from sqlalchemy import ForeignKey, SmallInteger, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.models._base_model import Base


class Section(Base):
    """Модель для описания раздела сметы."""

    __tablename__ = "Sections"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    estimate_id: Mapped[int] = mapped_column(ForeignKey("Estimates.id", ondelete="CASCADE"))
    # Информация о разделе
    title: Mapped[str] = mapped_column(String(100), server_default="")
    sort_index: Mapped[int] = mapped_column(SmallInteger(), unique=True, nullable=False)
    # обратная связь
    estimate = relationship("Estimate", back_populates="sections")
