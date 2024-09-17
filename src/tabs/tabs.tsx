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
          const oldIndex = tabs.indexOf(Number(active.id));
          const newIndex = tabs.indexOf(Number(over.id));

          return arrayMove(prevTabs, oldIndex, newIndex);
        });
      }
    }
  });

  return (
    <SortableContext items={tabs}>
      <div className="flex h-[50px] w-[800px] border-2 border-dashed border-zinc-300 font-bold">
        {tabs.map((tab) => (
          <TabButton key={tab} index={tab} active={tab === activeTab}>
            aba {tab}
          </TabButton>
        ))}
      </div>
    </SortableContext>
  );
}
