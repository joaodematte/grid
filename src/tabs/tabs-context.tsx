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

export const TabContext = createContext<TabContextProps | null>(null);

export function TabContextProvider({ children, activeTab, setActiveTab }: TabProviderProps) {
  return <TabContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabContext.Provider>;
}
