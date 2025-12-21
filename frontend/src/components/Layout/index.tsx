import css from "./index.module.scss";
import { PopupMenu } from "./Popup";
import { useAppContext } from "../../contexts/AppContext/context";
import { routes } from "../../pages";
import { useCallback, useMemo } from "react";
import { Outlet, NavLink } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";


export const Layout = () => {
  const { user } = useAppContext();

  const getActiveStyle = useCallback(({ isActive }: NavLinkRenderProps) => {
    return isActive ? css["link-active"] : "";
  }, []);

  const isUserAuth = useMemo(() => {
    return user === null ? css.disabled : getActiveStyle;
  }, [user, getActiveStyle]);

  return (
    <>
      <div className={css.layout}>
        <div className={css.side}>
          <NavLink to={routes.getMainPage()} className={getActiveStyle}>
            Главная
          </NavLink>
          <NavLink to={routes.getEstimatesPage()} className={isUserAuth}>
            Сметы
          </NavLink>
          <NavLink to={routes.getTemplatesPage()} className={isUserAuth}>
            Шаблоны
          </NavLink>
        </div>
        <div className={css.side}>
          <PopupMenu user={user} />
        </div>
      </div>
      <Outlet />
    </>
  );
};
