from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, SmallInteger, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.models._base_model import Base


class Estimate(Base):
    """Модель для представления основной инфомрации о смете."""

    __tablename__ = "Estimates"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("Users.id", ondelete="CASCADE"))
    # Непосредственно, информация о смете
    title: Mapped[str] = mapped_column(String(100))
    description: Mapped[str] = mapped_column(String(255), server_default="")
    project: Mapped[str] = mapped_column(String(100), server_default="")
    based_on: Mapped[str] = mapped_column(String(100), server_default="")
    materials_overhead: Mapped[int] = mapped_column(SmallInteger(), server_default="0")
    work_overhead: Mapped[int] = mapped_column(SmallInteger(), server_default="0")
    materials_discount: Mapped[int] = mapped_column(SmallInteger(), server_default="0")
    work_discount: Mapped[int] = mapped_column(SmallInteger(), server_default="0")
    # Временные метки
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
    # Связи
    sections = relationship("Section", back_populates="estimate")
