import type { EstimateSchemaType, UpdateSectionSchemaType } from "../../core/schemas";
import type { ReactNode } from "react";


export interface EstimateProviderProps {
  estimate: EstimateSchemaType;
  children: ReactNode;
}

type UpdateEstimateKeys = Exclude<keyof EstimateSchemaType, "id" | "createdAt" | "sections">;

export type UpdateEstimate = <T extends UpdateEstimateKeys>(
  prop: T,
  value: EstimateSchemaType[T]
) => void;

export type UpdateSection = (id: number, data: UpdateSectionSchemaType) => void;

export interface EstimateContextType extends EstimateSchemaType {
  totalAmount: number;
  isSectionsExists: boolean;
  updateEstimate: UpdateEstimate;
  deleteEstimate: () => void;
  addSection: () => void;
  updateSection: UpdateSection;
  deleteSection: (id: number) => void;
}
