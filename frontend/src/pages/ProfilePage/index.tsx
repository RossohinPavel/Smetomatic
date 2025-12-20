import { RequireAuth } from "../../components/RequireAuth";
import { useAppContext } from "../../contexts/AppContext/context";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { routes } from "../routes";
import css from "./index.module.scss";
import { Link } from "react-router-dom";


const Profile = () => {
  const { user, signOut } = useAppContext();

  useDocumentTitle("Профиль");

  return (
    user && (
      <>
        <h2>{user!.email}</h2>
        <Link to={routes.getAboutPage()}>О приложении</Link>
        <br />
        <button onClick={signOut}>Выйти</button>
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
