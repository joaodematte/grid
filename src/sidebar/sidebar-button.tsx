import { useDraggable } from '@dnd-kit/core';

interface Props {
  w: number;
  children: React.ReactNode | React.ReactNode[];
}

export function SidebarButton({ w, children }: Props) {
  const { transform, listeners, attributes, setNodeRef } = useDraggable({
    id: `${w}-sidebar`,
    data: {
      from: 'sidebar',
      w,
      h: 1
    }
  });

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0px)` : ''
  };

  return (
    <button
      ref={setNodeRef}
      className="w-full cursor-grab select-none bg-zinc-300 py-1 font-bold hover:bg-zinc-400 active:cursor-grabbing"
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </button>
  );
}
