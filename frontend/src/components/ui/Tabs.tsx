import * as React from "react";

// interface TabsProps {
//   activeIndex: number;
//   onChange: (index: number) => void;
//   className?: string;
//   children: React.ReactNode;
// }

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

interface TabTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  index: number;
  isActive?: boolean;
}

// export function Tabs({ children, activeIndex, onChange, className = "" }: TabsProps) {
//   return <div className={`flex flex-col gap-2 ${className}`}>{children}</div>;
// }

export function TabsList({ children, className = "" }: TabsListProps) {
  return <div className={`flex gap-2 ${className}`}>{children}</div>;
}

export function TabsTrigger({ index, isActive, className = "", ...props }: TabTriggerProps & { onClick?: () => void }) {
  return (
    <button
      className={`px-3 py-1 rounded-md text-sm font-medium ${
        isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
      } ${className}`}
      {...props}
    />
  );
}

export function TabsContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mt-2 ${className}`}>{children}</div>;
}
