import { Grid, GridContext } from './grid';

const initialLayout = [
  { id: '0', x: 0, y: 0, w: 3, h: 1 },
  { id: '1', x: 3, y: 0, w: 1, h: 1 },
  { id: '2', x: 0, y: 1, w: 2, h: 1 },
  { id: '3', x: 2, y: 1, w: 2, h: 1 }
];

export default function App() {
  return (
    <GridContext initialLayout={initialLayout} cols={4} colWidth={200} rowHeight={50}>
      <Grid />
    </GridContext>
  );
}
