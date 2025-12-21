import css from "./index.module.scss";
import { InfoForm } from "../../components/InfoForm";
import { apiClient } from "../../core/apiClient";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useQuery } from "@tanstack/react-query";


export const AboutPage = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["appUpdates"],
    queryFn: apiClient.getAppUpdates,
  });

  useDocumentTitle("О приложении");

  if (isLoading || data === undefined) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error: {error.message}</>;
  }

  return (
    <div className={css["about-page"]}>
      <InfoForm />
      <hr />
      <h2>Последние обновления приложения</h2>
      <br />
      {data?.map((info) => (
        <div key={info.id}>
          <h3>
            {info.createdAt.toLocaleDateString()} - {info.title}
          </h3>
          <p>{info.content}</p>
          <br />
        </div>
      ))}
    </div>
  );
};
