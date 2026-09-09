"use client";
import React, { createContext, useContext, useState } from "react";

type UIContextType = {
  searchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  cartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
};

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  return (
    <UIContext.Provider
      value={{
        searchModalOpen,
        openSearchModal: () => setSearchModalOpen(true),
        closeSearchModal: () => setSearchModalOpen(false),
        cartDrawerOpen,
        openCartDrawer: () => setCartDrawerOpen(true),
        closeCartDrawer: () => setCartDrawerOpen(false),
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
