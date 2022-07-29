import React from "react";

import { Link } from "@inertiajs/inertia-react";

const User = ({ user: { email, id, name } }) => (
  <Link
    id={`user-${id}`}
    className="w-full flex divide-x-2 hover:bg-slate-200"
    href={route("users.measurements.view", { id })}
    as="button"
  >
    <span className="w-1/12 p-4 text-center">{id}</span>
    <span className="w-5/12 p-4 text-left">{name}</span>
    <span className="w-1/2 p-4 text-left">{email}</span>
  </Link>
);

export default User;
