import css from "./index.module.scss";
import { EstimateCard } from "../../../components/EstimateCard";
import { apiClient } from "../../../core/apiClient";
import { useQuery } from "@tanstack/react-query";


export const LastEditedEstimates = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["LatestEstimates"],
    queryFn: apiClient.getEstimates,
  });

  if (isError) {
    return <>Error: {error.message}</>;
  }

  if (isLoading || data === undefined) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className={css.tabs}>
        <button>Последние</button>
        <button>Избранные</button>
      </div>
      <div className={css.estimates}>
        {data.estimates.map((e) => (
          <EstimateCard key={e.id} estimate={e} className={css.estimate} />
        ))}
      </div>
    </>
  );
};
