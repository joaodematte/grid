import React, { createContext } from 'react';

interface TabContextProps {
  activeTab: number;
  tabs: number[];
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  setTabs: React.Dispatch<React.SetStateAction<number[]>>;
}

interface TabProviderProps {
  activeTab: number;
  tabs: number[];
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  setTabs: React.Dispatch<React.SetStateAction<number[]>>;
  children: React.ReactNode | React.ReactNode[];
}

export const TabsContext = createContext<TabContextProps | null>(null);

export function TabsContextProvider({ children, activeTab, tabs, setActiveTab, setTabs }: TabProviderProps) {
  return <TabsContext.Provider value={{ activeTab, tabs, setActiveTab, setTabs }}>{children}</TabsContext.Provider>;
}
