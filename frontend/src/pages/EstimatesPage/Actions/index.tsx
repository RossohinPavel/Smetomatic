import { AddEstimateForm } from "../AddEstimateForm";
import css from "./index.module.scss";
import { useState } from "react";


export const Actions = ({ refetch }: { refetch: () => void }) => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <div className={css.actions}>
      <button onClick={() => setShowForm(!showForm)} disabled={showForm}>
        Новая
      </button>
      {showForm && <AddEstimateForm setShowForm={setShowForm} refetch={refetch} />}
    </div>
  );
};
