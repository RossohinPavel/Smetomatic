import css from "./index.module.scss";
import { routes } from "../../routes";
import { NavLink } from "react-router-dom";


export const SignInOrSignUp = () => {
  return (
    <div className={css["require-auth"]}>
      <NavLink to={routes.getSignInPage()}>Войдите</NavLink>
      <span>или</span>
      <NavLink to={routes.getSignUpPage()}>Зарегистрируйтесь, </NavLink>
      <span>чтобы пользоваться приложением.</span>
    </div>
  );
};
