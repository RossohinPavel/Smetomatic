import css from "./index.module.scss";
import type { props } from "./types.ts";
import { useAppContext } from "../../contexts/AppContext/context";
import { routes } from "../../pages";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";


export const RequireAuth = ({ redirectTo, children }: props) => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null && redirectTo) {
      navigate(redirectTo);
    }
  }, [user, navigate, redirectTo]);

  return user !== null ? (
    children
  ) : (
    <div className={css["require-auth"]}>
      <NavLink to={routes.getSignUpPage()}>Зарегистрируйтесь</NavLink>
      <span>или</span>
      <NavLink to={routes.getSignInPage()}>Войдите, </NavLink>
      <span>чтобы пользоваться приложением.</span>
    </div>
  );
};
