import React from "react";

import { Link } from "@inertiajs/inertia-react";
import { rest } from "lodash";

export default function Button({
  children,
  className = "",
  "data-testid": dataTestId,
  href = "",
  method = "get",
  processing,
  type = "submit",
  onClick = () => {},
}) {
  return (
    <button
      type={type}
      className={
        `inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ${
          processing && "opacity-25"
        } ` + className
      }
      data-testid={dataTestId}
      disabled={processing}
      onClick={onClick}
    >
      {href ? (
        <Link href={href} method={method}>
          {children}
        </Link>
      ) : (
        children
      )}
    </button>
  );
}
