import { DragMoveEvent, DragOverlay, DragStartEvent, useDndContext, useDndMonitor } from '@dnd-kit/core';
import { useLayoutEffect, useRef, useState } from 'react';

import { useTabsContext } from '../tabs/hooks/useTabContext';
import { GhostItem } from './ghost-item';
import { GridItem, GridItemOverlay } from './grid-item';
import { useGridContext } from './hooks';
import { Layout, LayoutItem } from './types';
import {
  createItemPosition,
  generateId,
  getGhostItems,
  getRows,
  resolveCollisions,
  resolveItemPosition
} from './utils';

export const Grid = () => {
  const { layout, cols, colWidth, rowHeight, updateLayout, removeItem, addItem } = useGridContext();
  const { activeTab, setActiveTab } = useTabsContext();

  const { active } = useDndContext();

  const [activeItem, setActiveItem] = useState<LayoutItem | null>(null);
  const [lastCollisionId, setLastCollisionId] = useState<string | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const isLastMoveFromSidebar = useRef<boolean>(false);

  const rows = getRows(layout);

  const ghostItems = getGhostItems(cols, rows);

  const generateLayoutItem = (id: string, w: number) => ({ id, w, h: 1 });

  const resolveCollisionsAndUpdateLayout = (updatedLayout: Layout, event: DragMoveEvent) => {
    const updatedLayoutWithoutCollisions = resolveCollisions([...updatedLayout], layout, event);

    updateLayout(activeTab, updatedLayoutWithoutCollisions);
  };

  const positionItem = (event: DragMoveEvent) => {
    const { pos, collidingId } = resolveItemPosition(activeItem, event, lastCollisionId);

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

    resolveCollisionsAndUpdateLayout(updatedLayout, event);
  };

  const handleOnDragStart = (event: DragStartEvent) => {
    const toBeActive = layout.find((item) => item.id === event.active.id);

    if (toBeActive) setActiveItem(toBeActive);
  };

  const handleOnDragEnd = () => {
    setActiveItem(null);

    isLastMoveFromSidebar.current = false;
  };

  const handleShouldCreateItem = (event: DragMoveEvent) => {
    const { shouldCreate, x, y } = createItemPosition(event);
    const width = event.active.data.current?.w;

    if (!activeItem) {
      const tempItem: LayoutItem = {
        ...generateLayoutItem(generateId(), width),
        x,
        y
      };

      setActiveItem(tempItem);
    } else if (shouldCreate) {
      updateLayout(activeTab, [...layout, activeItem]);
      isLastMoveFromSidebar.current = true;
    }

    setLastCollisionId(null);
  };

  const handleMoveBetweenTabs = (event: DragMoveEvent) => {
    const tabTo = event.over?.data.current?.id as number | undefined;

    if (tabTo === undefined || tabTo === activeTab) return;

    const item = layout.find((i) => i.id === event.active.id.toString());

    if (item) {
      addItem(tabTo, { ...item, x: -1, y: -1 });
      removeItem(activeTab, item.id);
      setLastCollisionId(null);
    }

    setActiveTab(tabTo);
  };

  const handleOnDragMove = (event: DragMoveEvent) => {
    if (typeof event.active.id === 'number') return;

    const isFromSidebar = event.active.data.current?.from === 'sidebar';
    const isTabMovement =
      event.collisions &&
      event.collisions[0] &&
      !event.collisions[0].id.toString().includes('-') &&
      event.collisions[0].data?.value <= 50;

    if (isTabMovement) {
      handleMoveBetweenTabs(event);

      return;
    }

    if (isFromSidebar && !isLastMoveFromSidebar.current) {
      handleShouldCreateItem(event);

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

  console.log(active);

  return (
    <div ref={gridRef} className="relative">
      {ghostItems.map((ghostItem) => (
        <GhostItem key={`${ghostItem.id}-ghost`} {...ghostItem} />
      ))}

      {layout.map((item) => item.x >= 0 && item.y >= 0 && <GridItem key={item.id} {...item} />)}

      <DragOverlay dropAnimation={{ duration: 0 }}>
        {active && typeof active.id !== 'number' ? (
          <GridItemOverlay
            id={active.id}
            w={active.data.current?.w}
            h={active.data.current?.h}
            x={active.data.current?.x}
            y={active.data.current?.y}
          />
        ) : (
          <div className="flex h-full w-[200px] items-center justify-between bg-zinc-100 px-8 font-bold hover:bg-zinc-200">
            aba {active?.id}
          </div>
        )}
      </DragOverlay>
    </div>
  );
};
