import type React from "react";


export type Callback = (key: string, value: string | number | null) => void;

export interface Props {
  attr: string;
  value: string | number | null;
  callback?: Callback;
  children: React.ReactElement;
}
