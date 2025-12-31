import { SectionContext } from "./context";
import type { SectionProviderProps } from "./types";
import { useEstimateContext } from "../EstimateContext/context";
import { useCallback, useMemo, useState } from "react";


export const SectionContextProvider = ({ section, children }: SectionProviderProps) => {
  const { deleteSection: deleteSectionFromEstimate } = useEstimateContext();
  // Неизменяемы атрибуты
  const id = section.id;
  const estimateId = section.estimateId;
  const sortIndex = section.sortIndex;
  // Изменяемые атрибуты
  const [title, setTitle] = useState(section.title);
  // Вычисляемые атрибуты
  const materialAmount = useMemo(() => 0, []);
  const workAmount = useMemo(() => 0, []);
  const totalAmount = useMemo(() => 0, []);

  // Эффекты, хендлеры и тп.
  const deleteSection = useCallback(
    () => deleteSectionFromEstimate(id),
    [id, deleteSectionFromEstimate]
  );

  return (
    <SectionContext.Provider
      value={{
        id,
        estimateId,
        sortIndex,
        title,
        setTitle,
        materialAmount,
        workAmount,
        totalAmount,
        deleteSection,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};
