"use client";

import { MdOutlineLogout } from "react-icons/md";
import Button from "../Button";
import { logout } from "@/server/actions";

export function Logout() {
  return (
    <Button onClick={() => logout()} type="button" theme="light">
      <MdOutlineLogout className="h-5 w-5" />
    </Button>
  );
}
