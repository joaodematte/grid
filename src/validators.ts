import { Active, DragMoveEvent } from '@dnd-kit/core';

export const isFromSidebar = (active: Active) => active.data?.current?.from === 'sidebar';

export const isFromTab = (active: Active) => active.data?.current?.from === 'tab';

export const isFromGrid = (active: Active) => active.data?.current?.from === 'grid';

export const isNewTab = (active: Active) => Boolean(active.data?.current?.isNewTab);

export const isCollidingWithTab = (event: DragMoveEvent) => {
  if (!event.collisions || !event.collisions[0].data) return false;

  return event.collisions[0].data.droppableContainer.data.current.from === 'tab';
};
