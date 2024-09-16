import { useGridContext } from '../grid';
import { useTabsContext } from './hooks';
import { TabButton } from './tab-button';

export function Tabs() {
  const { data } = useGridContext();
  const { activeTab } = useTabsContext();

  return (
    <div className="flex h-[50px] w-[800px] border-2 border-dashed border-zinc-300 font-bold">
      {Object.keys(data).map((tabIndex) => (
        <TabButton key={tabIndex} index={Number(tabIndex)} active={Number(tabIndex) === activeTab}>
          aba {tabIndex}
        </TabButton>
      ))}
    </div>
  );
}
