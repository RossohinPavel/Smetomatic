import { AppContext } from "./context";
import type { AppContextType } from "./types";
import { apiClient } from "../../core/apiClient";
import type { UserDataSchemaType } from "../../core/schemas";
import Cookies from "js-cookie";
import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";


export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | UserDataSchemaType>(null);

  const isRefreshTokenExists = useMemo(() => {
    return !!Cookies.get("refreshToken") || user !== null;
  }, [user]);

  // Получает и устанавливает данные пользователя
  const setUserData = useCallback(() => {
    apiClient
      .getUserData()
      .then((user) => {
        setUser(user);
        console.info(`User is authorized`);
      })
      .catch((error) => {
        if (error.cause === 401) {
          console.info("User unauthorized, reason:", error.message);
        } else {
          console.error(error);
        }
      });
  }, []);

  if (user === null && Cookies.get("refreshToken")) {
    setUserData();
  }

  const signOut = useCallback(() => {
    setUser(null);
    apiClient.signOut();
  }, []);

  return (
    <AppContext.Provider
      value={
        {
          user,
          setUserData,
          signOut,
          isRefreshTokenExists,
        } as AppContextType
      }
    >
      {children}
    </AppContext.Provider>
  );
};
