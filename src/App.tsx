import { DndContext } from '@dnd-kit/core';

import { closestLeftCorner, Grid, GridContext } from './grid';
import { Sidebar } from './sidebar/sidebar';

const initialLayout = [
  { id: '0', x: 0, y: 0, w: 3, h: 1 },
  { id: '1', x: 3, y: 0, w: 1, h: 1 },
  { id: '2', x: 0, y: 1, w: 2, h: 1 },
  { id: '3', x: 2, y: 1, w: 2, h: 1 }
];

export default function App() {
  return (
    <DndContext collisionDetection={closestLeftCorner}>
      <GridContext initialLayout={initialLayout} cols={4} colWidth={200} rowHeight={50}>
        <div className="flex h-full w-full">
          <Sidebar />
          <div className="mt-24 flex w-full justify-center">
            <Grid />
          </div>
        </div>
      </GridContext>
    </DndContext>
  );
}
