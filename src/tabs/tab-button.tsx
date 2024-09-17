import { useSortable } from '@dnd-kit/sortable';
import clsx from 'clsx';

import { useTabsContext } from './hooks';

interface TabButtonProps {
  index: number;
  active: boolean;
  children: React.ReactNode | React.ReactNode[];
}

export function TabButton({ index, active, children }: TabButtonProps) {
  const { setActiveTab } = useTabsContext();

  const { transform, listeners, attributes, setNodeRef, setActivatorNodeRef } = useSortable({
    id: `${index}-tab`,
    data: {
      id: index,
      w: 1,
      h: 1
    }
  });

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0px)` : ''
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex h-full w-[200px] items-center justify-between bg-zinc-100 px-8 hover:bg-zinc-200 ${clsx({ 'border-b-4 border-blue-800': active })}`}
      style={style}
      onClick={() => setActiveTab(index)}
      {...attributes}
    >
      <span>{children}</span>

      <button ref={setActivatorNodeRef} className="p-2" {...listeners}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cursor-grab"
        >
          <circle cx="9" cy="12" r="1" />
          <circle cx="9" cy="5" r="1" />
          <circle cx="9" cy="19" r="1" />
          <circle cx="15" cy="12" r="1" />
          <circle cx="15" cy="5" r="1" />
          <circle cx="15" cy="19" r="1" />
        </svg>
      </button>
    </div>
  );
}
