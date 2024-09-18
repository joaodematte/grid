import { useDraggable } from '@dnd-kit/core';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  kind: 'field' | 'tab';
  data?: {
    w?: number;
    h?: number;
    isNewTab?: boolean;
  };
}

export function SidebarButton({ id, data, children }: Props) {
  const { transform, listeners, attributes, setNodeRef } = useDraggable({
    id: `${id}-sidebar`,
    data: {
      ...data,
      from: 'sidebar'
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
