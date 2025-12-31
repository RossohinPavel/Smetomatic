import css from "./index.module.scss";
import { DebouncedChangeField } from "../../../components/DebouncedChangeField";
import type { Callback } from "../../../components/DebouncedChangeField/types";
import { useEstimateContext } from "../../../contexts/EstimateContext/context";


export const EstimateHeader = () => {
  const { title, description, project, basedOn, updatedAt, updateEstimate } = useEstimateContext();

  return (
    <div className={css["estimate-header"]}>
      <div className={css.about}>
        <div>О смете</div>
        <DebouncedChangeField
          attr="description"
          value={description}
          callback={updateEstimate as Callback}
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
          <DebouncedChangeField attr="title" value={title} callback={updateEstimate as Callback}>
            <input />
          </DebouncedChangeField>
        </div>
        <div className={css.meta}>
          <div>Объект</div>
          <DebouncedChangeField
            attr="project"
            value={project}
            callback={updateEstimate as Callback}
          >
            <input />
          </DebouncedChangeField>
        </div>
        <div className={css.meta}>
          <div>Основание</div>
          <DebouncedChangeField
            attr="basedOn"
            value={basedOn}
            callback={updateEstimate as Callback}
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
          <div>{updatedAt.toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};
