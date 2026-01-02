import type { SectionSchemaType } from "../../core/schemas";
import type { ReactNode } from "react";


export interface SectionProviderProps {
  section: SectionSchemaType;
  children: ReactNode;
}

export interface SectionContextType extends SectionSchemaType {
  materialAmount: number;
  workAmount: number;
  totalAmount: number;
  deleteSection: () => void;
  updateSection: UpdateSection;
}

type UpdateSectionKeys = "title" | "sortIndex";

export type UpdateSection = <T extends UpdateSectionKeys>(
  prop: T,
  value: SectionSchemaType[T]
) => void;
