import React, { createContext } from 'react';

interface TabContextProps {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

interface TabProviderProps {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode | React.ReactNode[];
}

export const TabsContext = createContext<TabContextProps | null>(null);

export function TabsContextProvider({ children, activeTab, setActiveTab }: TabProviderProps) {
  return <TabsContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabsContext.Provider>;
}
