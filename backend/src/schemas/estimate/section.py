from typing import Any

from pydantic import BaseModel, ConfigDict, Field, PrivateAttr


class CreateSectionSchema(BaseModel):
    """Схема для описания раздела сметы при ее создании."""

    model_config = ConfigDict(populate_by_name=True, extra="ignore")

    estimate_id: int = Field(alias="estimateId")
    title: str = Field(default="Новый раздел")
    sort_index: int = Field(alias="sortIndex")


class SectionSchema(CreateSectionSchema):
    """Схема для описания раздела сметы."""

    id: int


class UpdateSectionSchema(BaseModel):
    """Схема для описания раздела сметы при ее обновлении."""

    model_config = ConfigDict(populate_by_name=True, extra="ignore")

    title: str | None = Field(default=None)
    sort_index: int | None = Field(alias="sortIndex", default=None)

    # метка на присутствие какого-либо поля
    _initialized_fields: list[str] = PrivateAttr(default_factory=list)

    def __init__(self, **data):
        super().__init__(**data)
        for name, field_info in self.__class__.model_fields.items():
            search_field = name
            if field_info.alias is not None:
                search_field = field_info.alias
            if search_field in data:
                self._initialized_fields.append(name)

    def get_initialized_fields(self) -> dict[str, Any]:
        """Получаем словарь из инициализированных полей со своими типами значений"""
        return {attr: getattr(self, attr) for attr in self._initialized_fields}
