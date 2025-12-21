import css from "./index.module.scss";
import type { UserDataSchemaType } from "../../../core/schemas";
import { AuthMenu } from "../AuthMenu";
import { ProfileMenu } from "../ProfileMenu";
import { useCallback, useEffect, useRef, useState } from "react";


export const PopupMenu = ({ user }: { user: UserDataSchemaType | null }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    if (divRef === null || !showPopup) {
      return;
    }
    if (user === null) {
      const container = divRef.current?.childNodes[0];
      const form = container?.childNodes[0];
      const emailBlock = form?.childNodes[0];
      const input = emailBlock?.childNodes[1] as HTMLInputElement;
      input?.focus();
    } else {
      divRef.current?.focus();
    }
  }, [showPopup, divRef, user]);

  const handleBur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      if (e.relatedTarget === buttonRef.current) {
        return;
      }
      if (!divRef.current?.contains(e.relatedTarget as Node)) {
        setShowPopup(false);
      }
    },
    [divRef, setShowPopup, buttonRef]
  );

  return (
    <>
      <button ref={buttonRef} onClick={() => setShowPopup(!showPopup)}>
        {user === null ? "Войти" : "Профиль"}
      </button>
      <div ref={divRef} tabIndex={-1} className={css.popup} hidden={!showPopup} onBlur={handleBur}>
        {user === null ? (
          <AuthMenu setShowMenu={setShowPopup} />
        ) : (
          <ProfileMenu setShowMenu={setShowPopup} />
        )}
      </div>
    </>
  );
};
