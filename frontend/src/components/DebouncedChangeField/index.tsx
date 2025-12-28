import type { Props } from "./types";
import React, { cloneElement, useCallback, useEffect, useState } from "react";


const C = ({ attr, value, callback, children }: Props) => {
  const [innerValue, setInnerValue] = useState(value);

  const [debouncedValue, setDebouncedValue] = useState(innerValue);

  useEffect(() => {
    if (innerValue === debouncedValue) {
      return;
    }
    const timer = setTimeout(() => {
      setDebouncedValue(innerValue);
      if (callback) {
        callback(attr as string, innerValue);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [innerValue, debouncedValue, attr, callback]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue: string | number = e.target.value;
      if (typeof value === "number") {
        newValue = e.target.valueAsNumber;
      }
      setInnerValue(newValue);
    },
    [value, setInnerValue]
  );

  const props = { ...children.props!, name: attr, defaultValue: value, onChange: onChange };

  return cloneElement(children, props);
};

export const DebouncedChangeField = React.memo(C) as typeof C;
