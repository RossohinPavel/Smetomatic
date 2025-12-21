import css from "./index.module.scss";
import { RequireAuth } from "../../components/RequireAuth";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";


export const TemplatesPage = () => {
  useDocumentTitle("Шаблоны");

  return (
    <div className={css["template-page"]}>
      <RequireAuth>
        <>Эта страничка показывает шаблоны разделов</>;
      </RequireAuth>
    </div>
  );
};
