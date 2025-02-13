"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";
interface ConfirmOptions {
  title?: string;
  message?: string;
  onConfirm: () => Promise<void> | void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

interface ToastProps {
  t: {
    id: string;
  };
}

export function useConfirm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const confirm = (options: ConfirmOptions) => {
    const {
      title = "Confirm Action",
      message = "Are you sure you want to proceed?",
      onConfirm,
      onCancel,
      confirmText = "Confirm",
      cancelText = "Cancel",
    } = options;

    return toast(
      (t: ToastProps["t"]) => {
        return (
          <div className="flex flex-col space-y-4">
            {title && <h3 className="text-lg font-bold">{title}</h3>}
            <p>{message}</p>
            <div className="flex justify-between space-x-2">
              <button
                disabled={isLoading}
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    await onConfirm();
                    toast.dismiss(t.id);
                  } catch (error) {
                    toast.error(
                      error instanceof Error
                        ? error.message
                        : "An error occurred",
                    );
                  } finally {
                    setIsLoading(false);
                  }
                }}
                className={`flex items-center justify-center gap-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
              >
                {isLoading ? (
                  <>
                    <ImSpinner8 className="animate-spin" />
                    {confirmText}...
                  </>
                ) : (
                  confirmText
                )}
              </button>
              <button
                disabled={isLoading}
                onClick={() => {
                  toast.dismiss(t.id);
                  onCancel?.();
                }}
                className={`rounded-md bg-gray-200 px-4 py-2 text-black hover:bg-gray-300 ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
              >
                {cancelText}
              </button>
            </div>
          </div>
        );
      },
      {
        duration: Infinity,
      },
    );
  };

  return confirm;
}
