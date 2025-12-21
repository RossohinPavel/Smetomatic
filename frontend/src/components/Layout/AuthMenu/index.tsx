import css from "./index.module.scss";
import { routes } from "../../../pages";
import { SignInForm } from "../../SignInForm";
import { NavLink } from "react-router-dom";


export const AuthMenu = ({ setShowMenu }: { setShowMenu: (v: boolean) => void }) => {
  return (
    <div className={css["auth-menu"]}>
      <SignInForm className="popup-form" successCallback={() => setShowMenu(false)} />
      <div className={css.regq}>
        <div>Еще не </div>
        <NavLink to={routes.getSignUpPage()}>зарегистрированны?</NavLink>
      </div>
    </div>
  );
};
