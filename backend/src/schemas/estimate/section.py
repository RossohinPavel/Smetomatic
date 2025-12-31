from pydantic import BaseModel, ConfigDict, Field


class CreateSectionSchema(BaseModel):
    """Схема для описания раздела сметы при ее создании."""

    model_config = ConfigDict(populate_by_name=True, extra="ignore")

    estimate_id: int = Field(alias="estimateId")
    title: str = Field(default="Новый раздел")
    sort_index: int = Field(alias="sortIndex")


class SectionSchema(CreateSectionSchema):
    """Схема для описания раздела сметы."""

    id: int
