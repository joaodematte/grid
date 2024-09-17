import { useDndMonitor } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

import { useTabsContext } from './hooks';
import { TabButton } from './tab-button';

export function Tabs() {
  const { tabs, activeTab, setTabs } = useTabsContext();

  useDndMonitor({
    onDragEnd: ({ over, active }) => {
      if (!over) return;

      if (active.id !== over.id) {
        setTabs((prevTabs) => {
          const oldIndex = tabs.indexOf(Number(active.id.toString().split('-')[0]));
          const newIndex = tabs.indexOf(Number(over.id.toString().split('-')[0]));

          return arrayMove(prevTabs, oldIndex, newIndex);
        });
      }
    }
  });

  return (
    <SortableContext items={tabs}>
      <div className="flex h-[50px] w-[800px] border-2 border-dashed border-zinc-300 font-bold">
        {tabs.map((index) => (
          <TabButton key={`${index}-tab`} index={index} active={index === activeTab}>
            {`${index}-tab`}
          </TabButton>
        ))}
      </div>
    </SortableContext>
  );
}
