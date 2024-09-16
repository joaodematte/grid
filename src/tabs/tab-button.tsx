import { useDroppable } from '@dnd-kit/core';

import { useTabsContext } from './hooks';

interface TabButtonProps {
  index: number;
  children: React.ReactNode | React.ReactNode[];
}

export function TabButton({ index, children }: TabButtonProps) {
  const { setActiveTab } = useTabsContext();

  const { setNodeRef } = useDroppable({
    id: `${index}-tab`,
    data: {
      id: index
    }
  });

  return (
    <button
      ref={setNodeRef}
      key={index}
      className="grid h-full w-[200px] place-items-center bg-zinc-100 hover:bg-zinc-200"
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
}
