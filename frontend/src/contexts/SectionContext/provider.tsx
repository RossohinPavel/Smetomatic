import { SectionContext } from "./context";
import type { SectionProviderProps, UpdateSection } from "./types";
import { useEstimateContext } from "../EstimateContext/context";
import { useCallback, useMemo } from "react";


export const SectionContextProvider = ({ section, children }: SectionProviderProps) => {
  const { deleteSection: deleteSectionFromEstimate, updateSection: updateSectionFromEstimate } =
    useEstimateContext();
  // Неизменяемы атрибуты
  const id = section.id;
  const estimateId = section.estimateId;
  const sortIndex = section.sortIndex;
  // Изменяемые атрибуты
  const title = useMemo(() => section.title, [section.title]);
  // Вычисляемые атрибуты
  const materialAmount = useMemo(() => 0, []);
  const workAmount = useMemo(() => 0, []);
  const totalAmount = useMemo(() => 0, []);

  // Эффекты, хендлеры и тп.
  const deleteSection = useCallback(
    () => deleteSectionFromEstimate(id),
    [id, deleteSectionFromEstimate]
  );

  const updateSection = useCallback<UpdateSection>(
    (prop, value) => {
      updateSectionFromEstimate(id, { [prop]: value });
    },
    [id, updateSectionFromEstimate]
  );

  return (
    <SectionContext.Provider
      value={{
        id,
        estimateId,
        sortIndex,
        title,
        materialAmount,
        workAmount,
        totalAmount,
        deleteSection,
        updateSection,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};
