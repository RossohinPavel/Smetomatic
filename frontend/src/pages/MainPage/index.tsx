import { AppLatestInfo } from "./AppLatestInfo";
import css from "./index.module.scss";
import { LastEditedEstimates } from "./LastEditedEstimates";
import { RequireAuth } from "../../components/RequireAuth";


export const MainPage = () => {
  return (
    <div className={css["main-page"]}>
      <RequireAuth>
        <div className={css.tabs}>
          <button>Последние</button>
          <button>Избранные</button>
        </div>
        <LastEditedEstimates />
        <hr />
      </RequireAuth>
      <AppLatestInfo />
    </div>
  );
};
