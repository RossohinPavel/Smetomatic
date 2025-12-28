import css from "./index.module.scss";
import { DebouncedChangeField } from "../../../components/DebouncedChangeField";
import { useEstimateContext } from "../../../contexts/EstimateContext/context";
import { apiClient } from "../../../core/apiClient";
import { useCallback } from "react";


export const EstimateHeader = () => {
  const { estimate, renewUpdatedAt } = useEstimateContext();

  const updateEstimateInfo = useCallback(
    (key: string, value: unknown) => {
      const data = { [key]: value };
      apiClient
        .updateEstimate(estimate.id, data)
        .then(() => {
          console.info("Attr updated", data);
          renewUpdatedAt();
        })
        .catch((err) => console.error(err));
    },
    [estimate.id, renewUpdatedAt]
  );

  return (
    <div className={css["estimate-header"]}>
      <div className={css.about}>
        <div>О смете</div>
        <DebouncedChangeField
          attr="description"
          value={estimate.description}
          callback={updateEstimateInfo}
        >
          <textarea
            className={css.textarea}
            placeholder="Тут обычно бывает: Приложение к договору № 12345 от 1.2.2025"
            cols={2}
            maxLength={65}
          />
        </DebouncedChangeField>
      </div>
      <div className={css["agree-approved"]}>
        <div className={css.line}>
          <div>Согласовано</div>
          <input disabled></input>
        </div>
        <div className={css.line}>
          <div>Утвреждено</div>
          <input disabled></input>
        </div>
      </div>
      <div>
        <div className={css.meta}>
          <div>Смета</div>
          <DebouncedChangeField attr="title" value={estimate.title} callback={updateEstimateInfo}>
            <input />
          </DebouncedChangeField>
        </div>
        <div className={css.meta}>
          <div>Объект</div>
          <DebouncedChangeField
            attr="project"
            value={estimate.project}
            callback={updateEstimateInfo}
          >
            <input />
          </DebouncedChangeField>
        </div>
        <div className={css.meta}>
          <div>Основание</div>
          <DebouncedChangeField
            attr="basedOn"
            value={estimate.basedOn}
            callback={updateEstimateInfo}
          >
            <input />
          </DebouncedChangeField>
        </div>
        <div className={css.meta}>
          <div>Сметная стоимость</div>
          <div>12345</div>
        </div>
        <div className={css.meta}>
          <div>Дата составления</div>
          <div>{estimate.updatedAt.toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};
