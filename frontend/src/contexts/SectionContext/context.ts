import type { SectionContextType } from "./types";
import React from "react";


export const SectionContext = React.createContext<SectionContextType | undefined>(undefined);

export const useSectionContext = () => {
  const context = React.useContext(SectionContext);
  if (!context) {
    throw new Error("Use App context within provider!");
  }
  return context;
};
