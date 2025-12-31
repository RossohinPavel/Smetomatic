import { Actions } from "./Actions";
import { EstimateBody } from "./Body";
import { EstimateFooter } from "./Footer";
import { EstimateHeader } from "./Header";
import css from "./index.module.scss";
import { RequireAuth } from "../../components/RequireAuth";
import { EstimateContextProvider } from "../../contexts/EstimateContext/provider";
import { apiClient } from "../../core/apiClient";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";


const Estimate = () => {
  const { estimateId } = useParams() as { estimateId: string };

  useDocumentTitle("Сметы");

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["estimate", estimateId],
    queryFn: async () => {
      return await apiClient.getEstimate(estimateId);
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return <>Error: {error.message}</>;
  }
  if (isLoading || data === undefined) {
    return <>Loading...</>;
  }

  return (
    <EstimateContextProvider estimate={data}>
      <Actions />
      <EstimateHeader />
      <EstimateBody />
      <EstimateFooter />
    </EstimateContextProvider>
  );
};

export const EstimatePage = () => {
  return (
    <div className={css["estimate-page"]}>
      <RequireAuth>
        <Estimate />
      </RequireAuth>
    </div>
  );
};
