import css from "./index.module.scss";
import { useEstimateContext } from "../../../contexts/EstimateContext/context";


export const Actions = () => {
  const { addSection } = useEstimateContext();

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
