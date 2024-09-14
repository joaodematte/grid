import { ClientRect, CollisionDescriptor, CollisionDetection } from '@dnd-kit/core';
import { Coordinates } from '@dnd-kit/utilities';

export function distanceBetween(p1: Coordinates, p2: Coordinates) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

export function sortCollisionsAsc(
  { data: { value: a } }: CollisionDescriptor,
  { data: { value: b } }: CollisionDescriptor
) {
  return a - b;
}

export function cornersOfRectangle({ left, top }: ClientRect) {
  return {
    x: left,
    y: top
  };
}

export const closestLeftCorner: CollisionDetection = ({ collisionRect, droppableRects, droppableContainers }) => {
  const corner = cornersOfRectangle(collisionRect);

  const collisions: CollisionDescriptor[] = [];

  for (const droppableContainer of droppableContainers) {
    const { id } = droppableContainer;
    const rect = droppableRects.get(id);

    if (rect) {
      const rectCorner = cornersOfRectangle(rect);

      const droppableLeftCorner = rectCorner;

      const distance = distanceBetween(droppableLeftCorner, corner);

      collisions.push({
        id,
        data: { droppableContainer, value: distance }
      });
    }
  }

  return collisions.sort(sortCollisionsAsc).slice(0, 9);
};
