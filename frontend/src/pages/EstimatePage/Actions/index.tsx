import css from "./index.module.scss";
import { useEstimateContext } from "../../../contexts/EstimateContext/context";
import { routes } from "../../routes";
import { useNavigate } from "react-router-dom";


export const Actions = () => {
  const { addSection, deleteEstimate } = useEstimateContext();

  const navigate = useNavigate();

  const onEstimateDelete = () => {
    if (window.confirm("Вы уверены, что хотите удалить смету?")) {
      deleteEstimate();
      navigate(routes.getEstimatesPage());
    }
  };

  return (
    <div className={css.actions}>
      <button onClick={addSection}>Добавить раздел</button>
      <div>
        <button>Импортировать</button>
        <button>Экспортировать</button>
      </div>
      <button onClick={onEstimateDelete}>Удалить смету</button>
    </div>
  );
};
