import { EstimateSection } from "./EstimateSection";
import css from "./index.module.scss";
import { TableHeader } from "./TableHeader";
import { useEstimateContext } from "../../../contexts/EstimateContext/context";


export const EstimateBody = () => {
  const { isSectionsExists, sections } = useEstimateContext();

  return (
    <div className={css["estimate-body"]}>
      {isSectionsExists && (
        <>
          <TableHeader />
          {sections.map((section) => (
            <EstimateSection key={section.id} />
          ))}
        </>
      )}
    </div>
  );
};
