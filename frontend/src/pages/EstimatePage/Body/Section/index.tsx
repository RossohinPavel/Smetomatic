import { EstimateItem } from "../EstimateItem";
import css from "./index.module.scss";
import { useSectionContext } from "../../../../contexts/SectionContext/context";
import { SectionContextProvider } from "../../../../contexts/SectionContext/provider";
import type { SectionSchemaType } from "../../../../core/schemas";
import React from "react";


export const C = () => {
  const { title, materialAmount, workAmount, totalAmount, sortIndex, deleteSection } =
    useSectionContext();

  return (
    <div className={css.section}>
      <div className={css.header}>
        <div className={css.name}>
          <input type="text" defaultValue={`${title} - ${sortIndex}`} />
        </div>
        <div className={css.filler}></div>
        <div className={css.actions}>
          <button>+</button>
          <button>{"^"}</button>
          <button>{"˅"}</button>
          <button onClick={deleteSection}>x</button>
        </div>
      </div>
      <EstimateItem />
      <EstimateItem />
      <div className={css.footer}>
        <div className={css["section-amount"]}>Итого по разделу</div>
        <div className={css["material-amount"]}>
          <div></div>
          <div>{materialAmount}</div>
        </div>
        <div className={css["material-amount"]}>
          <div></div>
          <div>{workAmount}</div>
        </div>
        <div className={css["total-amount"]}>{totalAmount}</div>
        <div className={css["total-amount"]}></div>
      </div>
    </div>
  );
};

export const Section = React.memo(({ section }: { section: SectionSchemaType }) => (
  <SectionContextProvider section={section}>
    <C />
  </SectionContextProvider>
));
