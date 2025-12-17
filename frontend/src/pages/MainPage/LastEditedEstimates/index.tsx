// import css from "./index.module.scss";
import { EstimateCardMini } from "../../../components/EstimateCard";
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
    <div>
      {data.estimates.map((e) => (
        <EstimateCardMini key={e.id} estimate={e} />
      ))}
    </div>
  );
};
