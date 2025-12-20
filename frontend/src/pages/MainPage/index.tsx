import { AppLatestInfo } from "./AppLatestInfo";
import { LastEditedEstimates } from "./Estimates";
import css from "./index.module.scss";
import { SignInOrSignUp } from "./SignInOrSignUp";
import { useAppContext } from "../../contexts/AppContext/context";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";


export const MainPage = () => {
  const { isRefreshTokenExists } = useAppContext();

  useDocumentTitle();

  return (
    <div className={css["main-page"]}>
      {isRefreshTokenExists ? <LastEditedEstimates /> : <SignInOrSignUp />}
      <AppLatestInfo />
    </div>
  );
};
