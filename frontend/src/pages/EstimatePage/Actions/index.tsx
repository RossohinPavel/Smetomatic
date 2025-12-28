import css from "./index.module.scss";
import { useEstimateContext } from "../../../contexts/EstimateContext/context";
import { apiClient } from "../../../core/apiClient";
import { useCallback } from "react";


export const Actions = () => {
  const { estimate, setEstimate } = useEstimateContext();

  const addSection = useCallback(() => {
    apiClient
      .createSection({ estimateId: estimate.id })
      .then((section) => {
        setEstimate((prev) => {
          const newEstimate = { ...prev };
          newEstimate.sections.push(section);
          return newEstimate;
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [estimate]);

  return (
    <div className={css.actions}>
      <div>
        <button onClick={addSection}>Добавить раздел</button>
      </div>
      <div>
        <button>Импортировать</button>
        <button>Экспортировать</button>
      </div>
    </div>
  );
};
