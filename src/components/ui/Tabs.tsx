"use client";

import { useState, createContext, useContext, type ReactNode } from "react";

type TabsVariant = "underline" | "pills" | "enclosed";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: TabsVariant;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs components must be used within <Tabs>");
  return context;
}

interface TabsProps {
  defaultValue: string;
  variant?: TabsVariant;
  children: ReactNode;
  className?: string;
}

function Tabs({
  defaultValue,
  variant = "underline",
  children,
  className = "",
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, variant }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

const listStyles: Record<TabsVariant, string> = {
  underline: "flex gap-0 border-b border-gray-200 dark:border-slate-700",
  pills: "flex gap-2 p-1 bg-gray-100 dark:bg-slate-800 rounded-xl",
  enclosed: "flex gap-1 p-1 bg-gray-100 dark:bg-slate-800 rounded-xl",
};

function TabsList({ children, className = "" }: TabsListProps) {
  const { variant } = useTabs();
  return (
    <div role="tablist" className={`${listStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

const triggerStyles: Record<TabsVariant, string> = {
  underline:
    "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
  pills: "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
  enclosed: "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
};

function TabsTrigger({ value, children, className = "" }: TabsTriggerProps) {
  const { activeTab, setActiveTab, variant } = useTabs();
  const isActive = activeTab === value;

  const activeStyles = {
    underline: isActive
      ? "border-forest-trust text-forest-trust dark:border-synaptic-mint dark:text-synaptic-mint"
      : "border-transparent text-brand-muted hover:text-brand-ink dark:hover:text-white",
    pills: isActive
      ? "bg-white dark:bg-slate-700 text-brand-ink dark:text-white shadow-sm"
      : "text-brand-muted hover:text-brand-ink dark:hover:text-white",
    enclosed: isActive
      ? "bg-white dark:bg-slate-700 text-brand-ink dark:text-white shadow-sm"
      : "text-brand-muted hover:text-brand-ink dark:hover:text-white",
  };

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(value)}
      className={`${triggerStyles[variant]} ${activeStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

function TabsContent({ value, children, className = "" }: TabsContentProps) {
  const { activeTab } = useTabs();
  if (activeTab !== value) return null;

  return (
    <div role="tabpanel" className={`py-4 ${className}`}>
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, type TabsProps, type TabsVariant };
