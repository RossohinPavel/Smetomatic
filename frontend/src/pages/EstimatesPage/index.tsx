import css from "./index.module.scss";
import { RequireAuth } from "../../components/RequireAuth";
import { useAppContext } from "../../contexts/AppContext/context";
import { apiClient } from "../../core/apiClient";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { routes } from "../routes";
import { Actions } from "./Actions";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";


export const Estimates = () => {
  const { user } = useAppContext();

  useDocumentTitle("Сметы");

  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["estimates", user],
    queryFn: apiClient.getEstimates,
  });

  const estimatesList = useMemo(() => {
    if (isError) {
      return <>Error: {error.message}</>;
    }
    if (isLoading || data === undefined) {
      return <>Loading...</>;
    }
    return data.estimates.map((estimate) => (
      <div key={estimate.id}>
        <h3>
          <NavLink to={routes.getEstimatePage(String(estimate.id))}>{estimate.title}</NavLink>
        </h3>
        <p>{estimate.updatedAt.toLocaleDateString()}</p>
      </div>
    ));
  }, [data, isLoading, error, isError]);

  return (
    <>
      <Actions refetch={refetch} />
      {estimatesList}
    </>
  );
};

export const EstimatesPage = () => {
  return (
    <div className={css["estimates-page"]}>
      <RequireAuth>
        <Estimates />
      </RequireAuth>
    </div>
  );
};
