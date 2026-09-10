import { createContext, useContext, useState, type ReactNode } from 'react';

interface LayoutContextType {
  mobileOpen: boolean;
  toggleSidebar: () => void;
  setMobileOpen: (open: boolean) => void;
}

export const LayoutContext = createContext<LayoutContextType>({
  mobileOpen: false,
  toggleSidebar: () => {},
  setMobileOpen: () => {},
});

export function useLayout() {
  return useContext(LayoutContext);
}

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => setMobileOpen((prev) => !prev);

  return (
    <LayoutContext.Provider value={{ mobileOpen, toggleSidebar, setMobileOpen }}>
      {children}
    </LayoutContext.Provider>
  );
}
