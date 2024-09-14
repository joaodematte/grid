import { useDndContext, useDraggable } from '@dnd-kit/core';
import clsx from 'clsx';
import { CSSProperties, memo } from 'react';

import { useGridContext } from './hooks';
import { LayoutItem as GridItemProps } from './types';

export const GridItem = memo(({ id, x, y, w, h }: GridItemProps) => {
  const { colWidth, rowHeight } = useGridContext();

  const { active } = useDndContext();

  const posX = colWidth * x;
  const posY = rowHeight * y;

  const {
    attributes,
    listeners,
    setNodeRef: draggableRef
  } = useDraggable({
    id,
    data: {
      w,
      h,
      x,
      y
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
      <div
        ref={draggableRef}
        className="grid h-full w-full cursor-grab place-items-center"
        {...attributes}
        {...listeners}
      >
        {id}
      </div>
    </div>
  );
});

export const GridItemOverlay = memo(({ id, w, h }: GridItemProps) => {
  const { colWidth, rowHeight } = useGridContext();

  const style: CSSProperties = {
    width: colWidth * w,
    height: rowHeight * h
  };

  return (
    <div className="border-1 grid cursor-grabbing place-items-center border bg-zinc-100 font-bold" style={style}>
      {id}
    </div>
  );
});
