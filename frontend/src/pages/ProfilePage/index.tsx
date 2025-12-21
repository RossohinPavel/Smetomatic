import { RequireAuth } from "../../components/RequireAuth";
import { useAppContext } from "../../contexts/AppContext/context";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { routes } from "../routes";
import css from "./index.module.scss";


const Profile = () => {
  const { user } = useAppContext();

  useDocumentTitle("Профиль");

  return (
    user && (
      <>
        <h2>{user!.email}</h2>
      </>
    )
  );
};

export const ProfilePage = () => {
  return (
    <div className={css["profile-page"]}>
      <RequireAuth redirectTo={routes.getSignInPage()}>
        <Profile />
      </RequireAuth>
    </div>
  );
};
