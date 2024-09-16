import { ClientRect } from '@dnd-kit/core';

export interface GridProps {
  cols: number;
  colWidth: number;
  rowHeight: number;
  layout: Layout;
  children?: React.ReactNode | React.ReactNode[];
}

export interface GridContainer extends GridProps {
  rows: number;
  setGridRect: React.Dispatch<React.SetStateAction<ClientRect | null>>;
}

export interface GridDimensions {
  cols: number;
  rows: number;
}

export type LayoutItem = {
  id: string;
} & ItemPosition &
  ItemSize;

export interface ItemPosition {
  y: number;
  x: number;
}

export interface ItemSize {
  w: number;
  h: number;
}

export type Layout = LayoutItem[];

export type CollisionSide = 'top' | 'bottom' | 'left' | 'right' | 'none';

export interface GhostItemProps {
  id: string;
  x: number;
  y: number;
}

export interface ShouldCreate {
  shouldCreate: boolean;
  x: number;
  y: number;
}

export type GridData = Record<number, Layout>;
