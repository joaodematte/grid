import { useDroppable } from '@dnd-kit/core';

import { useGridContext } from './hooks';
import { GhostItemProps } from './types';

export const GhostItem = ({ id, x, y }: GhostItemProps) => {
  const ghostId = `${id}-ghost`;

  const { colWidth, rowHeight } = useGridContext();

  const { setNodeRef } = useDroppable({
    id: ghostId,
    data: {
      x,
      y
    }
  });

  const posX = colWidth * x;
  const posY = rowHeight * y;

  return (
    <div
      id={ghostId}
      className="absolute select-none opacity-25"
      style={{
        position: 'absolute',
        transform: `translate3d(${posX}px, ${posY}px, 0px)`,
        height: rowHeight,
        width: colWidth
      }}
    >
      <div
        ref={setNodeRef}
        className="flex h-full w-full items-center justify-center outline-dashed outline-1 outline-zinc-300"
        data-x={x}
        data-y={y}
      />
    </div>
  );
};
