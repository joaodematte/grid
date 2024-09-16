import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';

import { useTabsContext } from './hooks';

interface TabButtonProps {
  index: number;
  active: boolean;
  children: React.ReactNode | React.ReactNode[];
}

export function TabButton({ index, active, children }: TabButtonProps) {
  const { setActiveTab } = useTabsContext();

  const { setNodeRef } = useDroppable({
    id: `${index}-tab`,
    data: {
      id: index
    }
  });

  const classes = clsx({ 'border-4 border-red-500': active });

  return (
    <button
      ref={setNodeRef}
      key={index}
      className={`grid h-full w-[200px] place-items-center bg-zinc-100 hover:bg-zinc-200 ${classes}`}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
}
