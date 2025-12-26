import { EstimateSection } from "./EstimateSection";
import css from "./index.module.scss";
import { TableHeader } from "./TableHeader";
import { useEstimateContext } from "../../../contexts/EstimateContext/context";
import { useMemo } from "react";


export const EstimateBody = () => {
  const { estimate } = useEstimateContext();

  const sections = useMemo(() => {
    return estimate.sections.map(() => <EstimateSection />);
  }, [estimate.sections]);

  return (
    <div className={css["estimate-body"]}>
      {sections.length > 0 && <TableHeader />}
      {sections}
    </div>
  );
};
