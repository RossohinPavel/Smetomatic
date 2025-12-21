import css from "./index.module.scss";
import { useAppContext } from "../../../contexts/AppContext/context";
import { routes } from "../../../pages";
import { useNavigate } from "react-router-dom";


export const ProfileMenu = ({ setShowMenu }: { setShowMenu: (v: boolean) => void }) => {
  const { signOut } = useAppContext();

  const navigate = useNavigate();

  const profileUrl = routes.getProfilePage();
  const aboutPage = routes.getAboutPage();

  const clickWrapper = (func: () => void) => {
    return () => {
      setShowMenu(false);
      func();
    };
  };

  return (
    <div className={css["profile-menu"]}>
      <button onClick={clickWrapper(() => navigate(profileUrl))}>Профиль</button>
      <button onClick={clickWrapper(() => navigate(aboutPage))}>О приложении</button>
      <button onClick={clickWrapper(signOut)}>Выйти</button>
    </div>
  );
};
