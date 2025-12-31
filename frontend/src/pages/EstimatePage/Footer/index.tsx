import css from "./index.module.scss";
import { useEstimateContext } from "../../../contexts/EstimateContext/context";


export const EstimateFooter = () => {
  const { isSectionsExists, materialsOverhead, workOverhead, materialsDiscount, workDiscount } =
    useEstimateContext();

  return (
    isSectionsExists && (
      <div className={css["estimate-footer"]}>
        <div className={css.line}>
          <div className={css.name}>Итого по смете</div>
          <div className={css.materials}>
            <div className={css.item}>10</div>
            <div className={css.item}>14</div>
          </div>
          <div className={css.materials}>
            <div className={css.item}>10</div>
            <div className={css.item}>14</div>
          </div>
          <div className={css.total}>16</div>
          <div className={css.total}></div>
        </div>
        <div className={css.line}>
          <div className={css.name}>Накладные расходы</div>
          <div className={css.materials}>
            <div className={css.item}>{materialsOverhead}</div>
            <div className={css.item}>14</div>
          </div>
          <div className={css.materials}>
            <div className={css.item}>{workOverhead}</div>
            <div className={css.item}>14</div>
          </div>
          <div className={css.total}>16</div>
          <div className={css.total}></div>
        </div>
        <div className={css.line}>
          <div className={css.name}>Скидка</div>
          <div className={css.materials}>
            <div className={css.item}>{materialsDiscount}</div>
            <div className={css.item}>14</div>
          </div>
          <div className={css.materials}>
            <div className={css.item}>{workDiscount}</div>
            <div className={css.item}>14</div>
          </div>
          <div className={css.total}>16</div>
          <div className={css.total}></div>
        </div>
        <div className={css["line-total"]}>
          <div className={css.name}>Всего по смете</div>
          <div className={css.materials}>
            <div className={css.item}>10</div>
            <div className={css.item}>14</div>
          </div>
          <div className={css.materials}>
            <div className={css.item}>10</div>
            <div className={css.item}>14</div>
          </div>
          <div className={css.total}>16</div>
          <div className={css.total}></div>
        </div>
      </div>
    )
  );
};
