import css from "./index.module.scss";


export const Actions = () => {
  return (
    <div className={css.actions}>
      <div>
        <button>Добавить раздел</button>
      </div>
      <div>
        <button>Импортировать</button>
        <button>Экспортировать</button>
      </div>
    </div>
  );
};
