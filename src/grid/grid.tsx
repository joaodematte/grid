import { DragMoveEvent, DragOverlay, DragStartEvent, useDndMonitor } from '@dnd-kit/core';
import { useLayoutEffect, useRef, useState } from 'react';

import { useTabContext } from '../tabs/hooks/use-tab-context';
import { GhostItem } from './ghost-item';
import { GridItem, GridItemOverlay } from './grid-item';
import { useGridContext } from './hooks';
import { Layout, LayoutItem } from './types';
import { getGhostItems, getInitialSidebarItemPosition, getRows, resolveCollisions, resolveItemPosition } from './utils';

export const Grid = () => {
  const { layout, cols, colWidth, rowHeight, getNextLayoutId, updateLayout } = useGridContext();
  const { activeTab } = useTabContext();

  const [activeItem, setActiveItem] = useState<LayoutItem | null>(null);
  const [lastCollisionId, setLastCollisionId] = useState<string | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const isLastMoveFromSidebar = useRef<boolean>(false);

  const rows = getRows(layout);

  const ghostItems = getGhostItems(cols, rows);

  const generateLayoutItem = (id: string, w: number) => ({ id, w, h: 1 });

  const updateLayoutTemp = (updatedLayout: Layout, event: DragMoveEvent) => {
    const updatedLayoutWithoutCollisions = resolveCollisions([...updatedLayout], layout, event);

    updateLayout(activeTab, updatedLayoutWithoutCollisions);
  };

  const positionItem = (event: DragMoveEvent) => {
    const { pos, collidingId } = resolveItemPosition(event, lastCollisionId);

    if (pos.x === -1 || pos.y === -1) return;

    if (collidingId) setLastCollisionId(collidingId);

    const isFromSidebar = event.active.data.current?.from === 'sidebar';
    const activeId = event.active.id;

    const updatedLayout = layout.map((item) => {
      if (isFromSidebar && item === layout[layout.length - 1]) {
        return { ...item, x: pos.x, y: pos.y };
      }

      if (!isFromSidebar && item.id === activeId) {
        return { ...item, x: pos.x, y: pos.y };
      }

      return item;
    });

    updateLayoutTemp(updatedLayout, event);
  };

  const handleOnDragStart = (event: DragStartEvent) => {
    const toBeActive = layout.find((item) => item.id === event.active.id);

    if (toBeActive) setActiveItem(toBeActive);
  };

  const handleOnDragEnd = () => {
    setActiveItem(null);

    isLastMoveFromSidebar.current = false;
  };

  const handleSidebarDrag = (event: DragMoveEvent) => {
    const { shouldCreate, x, y } = getInitialSidebarItemPosition(event);
    const width = event.active.data.current?.w;

    const tempItem: LayoutItem = {
      ...generateLayoutItem(getNextLayoutId(), width),
      x,
      y
    };

    setActiveItem(tempItem);
    setLastCollisionId(null);

    if (shouldCreate) {
      updateLayout(activeTab, [...layout, tempItem]);

      isLastMoveFromSidebar.current = true;
    }
  };

  const handleOnDragMove = (event: DragMoveEvent) => {
    const isFromSidebar = event.active.data.current?.from === 'sidebar';

    if (isFromSidebar && !isLastMoveFromSidebar.current) {
      handleSidebarDrag(event);

      return;
    }

    positionItem(event);
  };

  useLayoutEffect(() => {
    if (!gridRef.current) return;

    gridRef.current.style.width = `${colWidth * cols}px`;
    gridRef.current.style.height = `${rowHeight * rows}px`;
  }, [gridRef, rows, cols, colWidth, rowHeight]);

  useDndMonitor({
    onDragStart: handleOnDragStart,
    onDragEnd: handleOnDragEnd,
    onDragMove: handleOnDragMove
  });

  return (
    <div ref={gridRef} className="relative">
      {ghostItems.map((ghostItem) => (
        <GhostItem key={`${ghostItem.id}-ghost`} {...ghostItem} />
      ))}

      {layout.map((item) => (
        <GridItem key={item.id} {...item} />
      ))}

      <DragOverlay dropAnimation={{ duration: 0 }}>
        {activeItem ? <GridItemOverlay {...activeItem} /> : null}
      </DragOverlay>
    </div>
  );
};
