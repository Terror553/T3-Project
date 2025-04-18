"use client";

import { logOut } from "~/server/auth/actions/logOut";

export function LogOutButton() {
  return (
    <button className="dropdown-item" onClick={async () => await logOut()}>
      Ausloggen
    </button>
  );
}
