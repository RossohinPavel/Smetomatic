import { EstimateContext } from "./context";
import type { EstimateProviderProps, UpdateEstimate, UpdateSection } from "./types";
import { apiClient } from "../../core/apiClient";
import type { UpdateSectionSchemaType } from "../../core/schemas";
import { useCallback, useEffect, useMemo, useState } from "react";


export const EstimateContextProvider = ({ estimate, children }: EstimateProviderProps) => {
  // Неизменяемы атрибуты
  const id = estimate.id;
  const createdAt = estimate.createdAt;
  // Изменяемые атрибуты
  const [title, setTitle] = useState(estimate.title);
  const [description, setDescription] = useState(estimate.description);
  const [project, setProject] = useState(estimate.project);
  const [basedOn, setBasedOn] = useState(estimate.basedOn);
  const [updatedAt, setUpdatedAt] = useState(estimate.updatedAt);
  const [materialsOverhead, setMaterialsOverhead] = useState(estimate.materialsOverhead);
  const [workOverhead, setWorkOverhead] = useState(estimate.workOverhead);
  const [materialsDiscount, setMaterialsDiscount] = useState(estimate.materialsDiscount);
  const [workDiscount, setWorkDiscount] = useState(estimate.workDiscount);
  const [sections, setSections] = useState(estimate.sections);
  // Вычисляемые атрибуты
  const totalAmount = useMemo(() => 0, []);
  const [isSectionsExists, setIsSectionsExists] = useState<boolean>(false);

  // Эффекты, хендлеры и тп.
  useEffect(() => {
    if (isSectionsExists !== !!sections.length) {
      setIsSectionsExists(!!sections.length);
    }
  }, [sections, isSectionsExists, setIsSectionsExists]);

  const updateEstimate = useCallback<UpdateEstimate>(
    (prop, value) => {
      switch (prop) {
        case "title":
          setTitle(value as string);
          break;
        case "description":
          setDescription(value as string);
          break;
        case "project":
          setProject(value as string);
          break;
        case "basedOn":
          setBasedOn(value as string);
          break;
        case "materialsOverhead":
          setMaterialsOverhead(value as number);
          break;
        case "workOverhead":
          setWorkOverhead(value as number);
          break;
        case "materialsDiscount":
          setMaterialsDiscount(value as number);
          break;
        case "workDiscount":
          setWorkDiscount(value as number);
          break;
      }
      setUpdatedAt(new Date());
      apiClient
        .updateEstimate(id, { [prop]: value })
        .then(() => {
          console.info("Estimate updated");
        })
        .catch((e) => {
          console.warn("Estimate update failed", e);
        });
    },
    [id]
  );

  const deleteEstimate = useCallback(() => {
    apiClient
      .deleteEstimate(id)
      .then(() => {
        console.info(`Estimate ${id} successfuly deleted.`);
      })
      .catch(() => {
        console.info(`Estimate ${id} deletion failed.`);
      });
  }, [id]);

  const addSection = useCallback(() => {
    const section = { id: -1, estimateId: id, title: "Новый раздел", sortIndex: 0 };
    setSections((prev) => {
      section.sortIndex = prev.length;
      return [...prev, section];
    });
    setUpdatedAt(new Date());
    apiClient
      .createSection(section)
      .then((resp) => {
        console.info(`Section id ${resp.id} was added to Estimate`);
        setSections((prev) => {
          const newSections = prev.filter((s) => s.id !== -1);
          newSections.push(resp);
          return newSections;
        });
      })
      .catch((e) => {
        console.warn(e);
        setSections((prev) => prev.filter((s) => s.id !== -1));
      });
  }, [id]);

  const updateSection = useCallback<UpdateSection>((id, data) => {
    let section;
    setSections((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          section = { ...s, ...data };
          return section;
        } else {
          return s;
        }
      })
    );
    apiClient
      .updateSection(id, data as UpdateSectionSchemaType)
      .then(() => {
        console.info(`Section id=`, id, `was updated`);
      })
      .catch((e) => console.warn(e));
  }, []);

  const deleteSection = useCallback((id: number) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
    apiClient
      .deleteSection(id)
      .then(() => {
        console.info(`Section id=`, id, `was deleted`);
      })
      .catch((e) => {
        console.warn(e);
      });
  }, []);

  return (
    <EstimateContext.Provider
      value={{
        id,
        title,
        description,
        project,
        basedOn,
        createdAt,
        updatedAt,
        materialsOverhead,
        workOverhead,
        materialsDiscount,
        workDiscount,
        sections,
        totalAmount,
        isSectionsExists,
        updateEstimate,
        deleteEstimate,
        addSection,
        deleteSection,
        updateSection,
      }}
    >
      {children}
    </EstimateContext.Provider>
  );
};
