import { EstimateContext } from "./context";
import type { EstimateProviderProps, UpdateEstimate } from "./types";
import { apiClient } from "../../core/apiClient";
import type { SectionSchemaType } from "../../core/schemas";
import { useCallback, useEffect, useMemo, useState } from "react";


export const EstimateContextProvider = ({ data, children }: EstimateProviderProps) => {
  // Неизменяемы атрибуты
  const id = data.id;
  const createdAt = data.createdAt;
  // Изменяемые атрибуты
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [project, setProject] = useState(data.project);
  const [basedOn, setBasedOn] = useState(data.basedOn);
  const [updatedAt, setUpdatedAt] = useState(data.updatedAt);
  const [materialsOverhead, setMaterialsOverhead] = useState(data.materialsOverhead);
  const [workOverhead, setWorkOverhead] = useState(data.workOverhead);
  const [materialsDiscount, setMaterialsDiscount] = useState(data.materialsDiscount);
  const [workDiscount, setWorkDiscount] = useState(data.workDiscount);
  const [sections, setSections] = useState(data.sections);
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

  const addSection = useCallback(() => {
    const section: SectionSchemaType = {
      id: -1,
      estimateId: id,
      title: "Новый раздел",
      sortIndex: 0,
    };
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
        addSection,
      }}
    >
      {children}
    </EstimateContext.Provider>
  );
};
