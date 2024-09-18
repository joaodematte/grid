import { SidebarButton } from './sidebar-button';

export function Sidebar() {
  return (
    <div className="h-full w-64 space-y-2 bg-zinc-200 p-4">
      <SidebarButton id="1" kind="field" data={{ w: 1, h: 1 }}>
        w-1
      </SidebarButton>
      <SidebarButton id="2" kind="field" data={{ w: 2, h: 1 }}>
        w-2
      </SidebarButton>
      <SidebarButton id="3" kind="field" data={{ w: 3, h: 1 }}>
        w-3
      </SidebarButton>
      <SidebarButton id="4" kind="field" data={{ w: 4, h: 1 }}>
        w-4
      </SidebarButton>
      <SidebarButton id="newtab" kind="field">
        nova aba
      </SidebarButton>
    </div>
  );
}
