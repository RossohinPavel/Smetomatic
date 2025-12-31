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
  setTitle: (title: string) => void;
  deleteSection: () => void;
}
