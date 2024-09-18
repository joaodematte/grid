import { useDndContext, useDraggable } from '@dnd-kit/core';
import clsx from 'clsx';
import { CSSProperties } from 'react';

import { useGridContext } from './hooks';
import { LayoutItem as GridItemProps } from './types';

export const GridItem = ({ id, x, y, w, h }: GridItemProps) => {
  const { colWidth, rowHeight } = useGridContext();

  const { active } = useDndContext();

  const posX = colWidth * x;
  const posY = rowHeight * y;

  const { attributes, listeners, setNodeRef, setActivatorNodeRef } = useDraggable({
    id,
    data: {
      w,
      h,
      x,
      y,
      from: 'grid'
    }
  });

  const style: CSSProperties = {
    transform: `translate3d(${posX}px, ${posY}px, 0px)`,
    width: colWidth * w,
    height: rowHeight * h
  };

  const currentActive = active ? active.id === id : false;

  const classes = clsx({
    'bg-zinc-50 border-dashed border-2 border-zinc-500': currentActive,
    'bg-zinc-100 border border-2 border-zinc-200': !currentActive
  });

  return (
    <div id={id} style={style} className={`${classes} absolute font-bold`}>
      <div ref={setNodeRef} className="flex h-full w-full cursor-grab select-none items-center px-4" {...attributes}>
        <div className="flex items-center gap-4">
          <button ref={setActivatorNodeRef} className="p-2 text-zinc-400" {...listeners}>
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
          {id}
        </div>
      </div>
    </div>
  );
};
