import { EstimateContext } from "./context";
import type { EstimateContextType, EstimateProviderProps } from "./types";
import { useCallback, useState } from "react";


export const EstimateContextProvider = ({ data, children }: EstimateProviderProps) => {
  const [estimate, setEstimate] = useState(data);

  const renewUpdatedAt = useCallback(() => {
    setEstimate({ ...estimate, updatedAt: new Date() });
  }, [estimate, setEstimate]);

  return (
    <EstimateContext.Provider
      value={
        {
          estimate,
          setEstimate,
          renewUpdatedAt,
        } as EstimateContextType
      }
    >
      {children}
    </EstimateContext.Provider>
  );
};
