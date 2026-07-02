"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useIdSet } from "./useIdSet";

type IdSetApi = {
  ids: string[];
  has: (id: string) => boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
  count: number;
};

const FavouritesContext = createContext<IdSetApi | null>(null);
const CompareContext = createContext<IdSetApi | null>(null);

export function Providers({ children }: { children: ReactNode }) {
  const favourites = useIdSet("bh_favourites");
  const compare = useIdSet("bh_compare");

  return (
    <FavouritesContext.Provider value={favourites}>
      <CompareContext.Provider value={compare}>{children}</CompareContext.Provider>
    </FavouritesContext.Provider>
  );
}

export function useFavourites(): IdSetApi {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error("useFavourites must be used within Providers");
  return ctx;
}

export function useCompare(): IdSetApi {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within Providers");
  return ctx;
}
