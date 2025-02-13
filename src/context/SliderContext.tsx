"use client";

import { SliderContextType } from "@/type/interfaces";
import { createContext, useContext, useState, ReactNode } from "react";

const SliderContext = createContext<SliderContextType | undefined>(undefined);

export function SliderProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSlider = () => setIsOpen((prev) => !prev);

  return (
    <SliderContext.Provider value={{ isOpen, toggleSlider }}>
      {children}
    </SliderContext.Provider>
  );
}

// Custom hook for using the slider context
export function useSlider() {
  const context = useContext(SliderContext);
  if (context === undefined)
    throw new Error("useSlider must be used within a SliderProvider");
  return context;
}
