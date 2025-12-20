import { useAppContext } from "../../contexts/AppContext/context";
import { routes } from "../../pages";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


interface props {
  redirectTo?: string;
  children: React.ReactNode;
}

export const RequireAuth = ({ redirectTo = routes.getMainPage(), children }: props) => {
  const { isRefreshTokenExists } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRefreshTokenExists && redirectTo) {
      navigate(redirectTo);
    }
  }, [isRefreshTokenExists, navigate, redirectTo]);

  return isRefreshTokenExists && children;
};
