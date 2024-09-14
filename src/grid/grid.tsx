import {
  DndContext,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { memo, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { GhostItem } from './ghost-item';
import { GridItem, GridItemOverlay } from './grid-item';
import { useGridContext } from './hooks';
import { Layout, LayoutItem } from './types';
import { closestLeftCorner, getGhostItems, getRows, resolveCollisions, resolveItemPosition } from './utils';

export const Grid = memo(() => {
  const { layout, cols, colWidth, rowHeight, setLayout } = useGridContext();

  const [activeItem, setActiveItem] = useState<LayoutItem | null>(null);
  const [lastCollisionId, setLastCollisionId] = useState<string | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);

  const rows = useMemo(() => getRows(layout), [layout]);

  const ghostItems = useMemo(() => getGhostItems(cols, rows), [cols, rows]);

  // const lastLayoutId = useMemo(() => layout.reduce((max, item) => Math.max(max, parseInt(item.id, 10)), -1), [layout]);

  // const nextLayoutId = useMemo(() => (lastLayoutId + 1).toString(), [lastLayoutId]);

  // const generateLayoutItem = useCallback((id: string, w: number) => ({ id, x: -1, y: -1, w, h: 1 }), []);

  const updateLayout = useCallback(
    (updatedLayout: Layout, event: DragMoveEvent) => {
      if (JSON.stringify(updatedLayout) !== JSON.stringify(layout)) {
        const updatedLayoutWithoutCollisions = resolveCollisions(updatedLayout, layout, event);

        setLayout(updatedLayoutWithoutCollisions);
      }
    },
    [layout, setLayout]
  );

  const positionItem = useCallback(
    (event: DragMoveEvent) => {
      const { pos, collidingId } = resolveItemPosition(event, lastCollisionId);

      if (pos.x === -1 || pos.y === -1) return;

      const id = event.active.id;
      const updatedLayout = layout.map((i) => (i.id === id ? { ...i, x: pos.x, y: pos.y } : i));

      if (collidingId) setLastCollisionId(collidingId);

      updateLayout(updatedLayout, event);
    },
    [lastCollisionId, layout, updateLayout]
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const toBeActive = layout.find((item) => item.id === event.active.id);

      if (toBeActive) setActiveItem(toBeActive);
    },
    [layout]
  );

  const handleDragEnd = useCallback(() => {
    setActiveItem(null);
  }, []);

  const handleOnDragMove = useCallback(
    (event: DragMoveEvent) => {
      positionItem(event);
    },
    [positionItem]
  );

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  useLayoutEffect(() => {
    if (!gridRef.current) return;

    gridRef.current.style.width = `${colWidth * cols}px`;
    gridRef.current.style.height = `${rowHeight * rows}px`;
  }, [gridRef, rows, cols, colWidth, rowHeight]);

  return (
    <div className="flex h-full w-full">
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragMove={handleOnDragMove}
        collisionDetection={closestLeftCorner}
        sensors={sensors}
      >
        <div className="grid h-full w-full place-items-center">
          <div ref={gridRef} className="relative">
            {ghostItems.map((ghostItem) => (
              <GhostItem key={`${ghostItem.id}-ghost`} {...ghostItem} />
            ))}
            {layout.map((item) => (
              <GridItem key={item.id} {...item} />
            ))}
          </div>
        </div>
        <DragOverlay dropAnimation={{ duration: 0 }}>
          {activeItem ? <GridItemOverlay {...activeItem} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
});
