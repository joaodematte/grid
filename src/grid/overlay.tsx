import { useDndContext } from '@dnd-kit/core';
import clsx from 'clsx';

import { useTabsContext } from '../tabs';
import { isFromTab } from '../validators';
import { useGridContext } from './hooks';

export function Overlay() {
  const { colWidth, rowHeight } = useGridContext();
  const { active } = useDndContext();
  const { activeTab } = useTabsContext();

  if (!active || !active.data.current) return null;

  const stringId = active.id.toString();
  const { w, h } = active.data.current;

  const style: React.CSSProperties = {
    width: colWidth * w,
    height: rowHeight * h
  };

  if (isFromTab(active)) {
    return (
      <div
        className={`flex h-full w-[200px] items-center justify-between bg-zinc-100 px-8 font-bold hover:bg-zinc-200 ${clsx({ 'border-b-4 border-blue-800': activeTab === Number(stringId.split('-')[0]) })}`}
      >
        {active.id}
        <button className="p-2">
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

  return (
    <div
      className="border-1 grid cursor-grabbing select-none place-items-center border bg-zinc-100 font-bold"
      style={style}
    >
      {stringId}
    </div>
  );
}
