"use client";
import Button from "@/components/Button";
import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { HiXMark } from "react-icons/hi2";

type ModalContextType = {
  openName: string;
  close: () => void;
  open: (id: string) => void;
};
const ModalContext = createContext<ModalContextType | null>(null);

function Modal({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState<string>("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}
function Open({
  children,
  name,
}: {
  children: React.ReactElement<{ onClick: () => void }>;
  name: string;
}) {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("Modal.Open must be used within a Modal provider");

  return cloneElement(children, {
    onClick: () => context.open(name),
  });
}
function Window({
  children,
  name,
}: {
  children: React.ReactNode | React.ReactElement;
  name: string;
}) {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("Window.Open must be used within a Modal provider");
  const { close, openName } = context;
  if (name !== openName) return null;
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-300/[0.6] dark:bg-gray-900/[0.6] md:inset-0">
      <div className="relative max-h-full w-full max-w-2xl p-4">
        <div className="relative rounded-lg bg-white shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-600 md:p-5">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {name.replaceAll("_", " ").toLocaleUpperCase()}
            </h3>
            <Button theme="light" onClick={close}>
              <HiXMark />
            </Button>
          </div>
          {/* <div>{cloneElement(children, { onCloseModal: close })}</div> */}
          <div className="space-y-4 p-4 md:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
