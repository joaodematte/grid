import { useDndMonitor } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

import { useGridContext } from '../grid';
import { isFromSidebar, isFromTab, isNewTab } from '../validators';
import { useTabsContext } from './hooks';
import { TabButton } from './tab-button';

export function Tabs() {
  const { data, addTab } = useGridContext();
  const { tabs, activeTab, setTabs } = useTabsContext();

  useDndMonitor({
    onDragEnd: ({ over, active }) => {
      if (!over) return;

      if ((isFromTab(active) || (isFromSidebar(active) && isNewTab(active))) && active.id !== over.id) {
        setTabs((prevTabs) => {
          let arr = prevTabs;

          const oldIndex = tabs.indexOf(Number(active.data.current?.id));
          const newIndex = tabs.indexOf(Number(over.data.current?.id));

          if (oldIndex === -1) arr = [...prevTabs, prevTabs.length + 1];

          if (Object.keys(data).length !== arr.length) {
            addTab(prevTabs.length + 1);
          }

          return arrayMove(arr, oldIndex, newIndex);
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
