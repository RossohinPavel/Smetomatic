import css from "./index.module.scss";
import { RequireAuth } from "../../components/RequireAuth";


export const TemplatesPage = () => {
  return (
    <div className={css["template-page"]}>
      <RequireAuth>
        <>Эта страничка показывает шаблоны разделов</>;
      </RequireAuth>
    </div>
  );
};
