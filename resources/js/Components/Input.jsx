import React, { useEffect, useRef } from "react";

import { Label } from "@/Components";

export default function Input({
  autoComplete,
  className,
  error,
  handleChange,
  isFocused,
  label = null,
  name,
  required,
  type = "text",
  value,
}) {
  const input = useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <>
      {label && <Label className="mt-4" forInput={name} value={label} />}
      <div className="flex flex-col items-start">
        <input
          type={type}
          name={name}
          value={value}
          className={
            `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
            className
          }
          ref={input}
          autoComplete={autoComplete}
          required={required}
          onChange={(e) => handleChange(e)}
        />
        {error && <small className="text-error">{error.message}</small>}
      </div>
    </>
  );
}
