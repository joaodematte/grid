import { SidebarButton } from './sidebar-button';

export function Sidebar() {
  return (
    <div className="h-full w-64 space-y-2 bg-zinc-200 p-4">
      <SidebarButton w={1}>w-1</SidebarButton>
      <SidebarButton w={2}>w-2</SidebarButton>
      <SidebarButton w={3}>w-3</SidebarButton>
      <SidebarButton w={4}>w-4</SidebarButton>
    </div>
  );
}
