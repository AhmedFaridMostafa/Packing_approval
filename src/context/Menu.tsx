"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type MouseEvent,
} from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import Button from "@/components/Button";

type MenusContextType = {
  openId: string;
  close: () => void;
  open: (id: string) => void;
};

type MenusProps = {
  children: ReactNode;
};

type MenuProps = {
  children: ReactNode;
};

type ToggleProps = {
  id: string;
};

type ListProps = {
  id: string;
  children: ReactNode;
};

type ButtonListProps = {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const MenusContext = createContext<MenusContextType | null>(null);

function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState<string>("");
  const close = () => setOpenId("");
  const open = (id: string) => setOpenId(id);

  return (
    <MenusContext.Provider value={{ openId, close, open }}>
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }: MenuProps) {
  return (
    <div className="relative flex items-center justify-end">{children}</div>
  );
}

function Toggle({ id }: ToggleProps) {
  const context = useContext(MenusContext);
  if (!context)
    throw new Error("Menus.Toggle must be used within a Menus provider");

  const { openId, close, open } = context;

  function handleClick() {
    if (openId === "" || openId !== id) {
      open(id);
    } else {
      close();
    }
  }

  return (
    <Button
      type="button"
      theme="light"
      size="sm"
      className="p-2"
      onClick={handleClick}
    >
      <HiEllipsisVertical className="h-5 w-5" />
    </Button>
  );
}

function List({ id, children }: ListProps) {
  const context = useContext(MenusContext);
  if (!context)
    throw new Error("Menus.List must be used within a Menus provider");

  const { openId, close } = context;
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        close();
      }
    }

    document.addEventListener("click", handleClickOutside as () => void);
    return () =>
      document.removeEventListener("click", handleClickOutside as () => void);
  }, [close]);

  if (openId !== id) return null;

  return (
    <ul
      ref={menuRef}
      className="absolute right-0 top-full z-50 overflow-hidden rounded-md bg-white shadow-lg dark:bg-gray-900"
    >
      {children}
    </ul>
  );
}

function ButtonList({ children, icon, onClick, disabled }: ButtonListProps) {
  const context = useContext(MenusContext);
  if (!context)
    throw new Error("Menus.Button must be used within a Menus provider");

  const { close } = context;

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        className="flex w-full items-center gap-4 px-6 py-3 text-base hover:bg-slate-50 dark:hover:bg-slate-600 sm:gap-6 sm:px-10 sm:py-5 sm:text-lg"
        onClick={handleClick}
        type="button"
        disabled={disabled}
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = ButtonList;

export default Menus;
