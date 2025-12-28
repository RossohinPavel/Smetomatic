import type React from "react";


export interface Props {
  attr: string;
  value: string | number | null;
  callback?: (attr: string, value: string | number | null) => void;
  children: React.ReactElement;
}
