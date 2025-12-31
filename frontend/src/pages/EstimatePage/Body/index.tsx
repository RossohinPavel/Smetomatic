import css from "./index.module.scss";
import { Section } from "./Section";
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
            <Section key={section.id} section={section} />
          ))}
        </>
      )}
    </div>
  );
};
