import { DragEndEvent, DragMoveEvent } from '@dnd-kit/core';

import { CollisionSide, ItemPosition, ItemSize, Layout, LayoutItem } from '../types';

function isItemColliding(item: LayoutItem, otherItem: LayoutItem): boolean {
  return (
    item.id !== otherItem.id &&
    item.x < otherItem.x + otherItem.w &&
    item.y < otherItem.y + otherItem.h &&
    item.x + item.w > otherItem.x &&
    item.y + item.h > otherItem.y
  );
}

export function getCollisions(currentItem: LayoutItem, layout: Layout): LayoutItem[] {
  return layout.filter((item) => isItemColliding(currentItem, item));
}

export function hasCollisions(currentItem: LayoutItem, layout: Layout): boolean {
  return layout.some((item) => isItemColliding(currentItem, item));
}

export function getRows(layout: Layout): number {
  let rows = 0;

  for (const item of layout) {
    rows = Math.max(rows, item.y + item.h);
  }

  return rows + 1;
}

export function getCollisionSide(item: LayoutItem, collidingItem: LayoutItem): CollisionSide {
  if (item.y > collidingItem.y) return 'top';

  if (item.y < collidingItem.y) return 'bottom';

  if (item.x > collidingItem.x) return 'left';

  return 'right';
}

function resolveVerticalCollision(item: LayoutItem, layout: Layout, direction: -1 | 1) {
  const itemsInSameRow = layout.filter((i) => i.y === item.y && i.id !== item.id);
  const canMoveWithoutCollision = itemsInSameRow.every(
    (rowItem) => !hasCollisions({ ...rowItem, y: rowItem.y + direction }, layout)
  );

  if (canMoveWithoutCollision) {
    for (const rowItem of itemsInSameRow) {
      rowItem.y += direction;
    }

    return;
  }

  for (const layoutItem of layout) {
    if (layoutItem.id === item.id || layoutItem.y < item.y) continue;

    layoutItem.y += Math.abs(direction);
  }
}

export function resolveBottomCollision(item: LayoutItem, layout: Layout) {
  resolveVerticalCollision(item, layout, -1);
}

export function resolveTopCollision(item: LayoutItem, layout: Layout) {
  resolveVerticalCollision(item, layout, 1);
}

export function resolveHorizontalCollision(item: LayoutItem, collidingItems: Layout, layout: Layout) {
  for (const collidingItem of collidingItems) {
    const item = layout.find((i) => i.id === collidingItem.id);

    if (!item) return;

    for (let newX = 0; newX <= 4 - collidingItem.w; newX++) {
      const potentialPosition = { ...collidingItem, x: newX };

      if (!hasCollisions(potentialPosition, layout)) {
        item.x = newX;

        return layout;
      }
    }
  }

  for (const layoutItem of layout) {
    if (layoutItem.y >= item.y && layoutItem.id !== item.id) {
      layoutItem.y++;
    }
  }
}

export function swapHorizontalItems(item: LayoutItem, itemToSwap: LayoutItem, collisionSide: CollisionSide) {
  const tempX = item.x;
  const tempY = item.y;

  item.x = itemToSwap.x;
  item.y = itemToSwap.y;

  itemToSwap.x = collisionSide === 'right' ? tempX - 1 : tempX + 1;
  itemToSwap.y = tempY;
}

export function resolveCollisionsHelper(
  item: LayoutItem,
  collidingItems: LayoutItem[],
  collisionSide: CollisionSide,
  layout: Layout
) {
  switch (collisionSide) {
    case 'bottom':
      resolveBottomCollision(item, layout);
      break;
    case 'top':
      resolveTopCollision(item, layout);
      break;
    case 'left':
    case 'right': {
      const halfSizeItem = layout.filter(
        (i) => i.y === item.y && item.id !== i.id && i.w === 4 / 2 && item.w === 4 / 2
      );

      if (halfSizeItem.length === 1) swapHorizontalItems(item, halfSizeItem[0], collisionSide);

      return resolveHorizontalCollision(item, collidingItems, layout);
    }
    default:
      break;
  }
}

export function resolveItemPosition(
  event: DragEndEvent,
  lastCollisionId: string | null
): { pos: ItemPosition; collidingId: string | null } {
  const { collisions } = event;

  if (!collisions || collisions.length === 0 || !collisions[0].data)
    return { pos: { x: -1, y: -1 }, collidingId: lastCollisionId };

  const { w } = event.active.data?.current as ItemSize;
  const { x, y } = collisions[0].data.droppableContainer.data.current as ItemPosition;

  if (exceedsBy({ x, w }) > 0 || collisions[0].id === lastCollisionId)
    return { pos: { x: -1, y: -1 }, collidingId: lastCollisionId };

  return { pos: { x, y }, collidingId: collisions[0].id.toString() };
}

export function resolveCollisions(layout: Layout, previousLayout: Layout, event: DragMoveEvent): Layout {
  const item = layout.find((i) => i.id === event.active.id);
  const itemInPreviousLayout = previousLayout.find((i) => i.id === event.active.id);

  // FIX pode ser que de erro quando arrastar o campo da sidebar (itemInPreviousLayout) <- ainda n existe
  if (!item || !itemInPreviousLayout) return layout;

  const collisions = getCollisions(item, layout);

  if (collisions.length === 0) return layout;

  const collisionSide = getCollisionSide(itemInPreviousLayout, item);

  resolveCollisionsHelper(item, collisions, collisionSide, layout);

  return layout;
}

export function getGhostItems(cols: number, rows: number): { id: string; x: number; y: number }[] {
  const items: { id: string; x: number; y: number }[] = [];

  for (let id = 0; id < cols * rows; id++) {
    items.push({
      id: String(id),
      x: id % cols,
      y: Math.floor(id / cols)
    });
  }

  return items;
}

export function exceedsBy({ x, w }: { x: number; w: number }): number {
  return Math.max(0, x + w - 4);
}
