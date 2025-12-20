import { useEffect } from "react";


export const useDocumentTitle = (title?: string) => {
  const postfix = "Smetomatic";

  useEffect(() => {
    document.title = title ? `${title} | ${postfix}` : postfix;
  }, [title]);
};
