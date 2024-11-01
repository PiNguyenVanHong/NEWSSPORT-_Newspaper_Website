import { Bell, CircleUser, Settings, Slash } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import BreadcrumbCustom from "@/components/breadcumb-custom";

interface HeaderActionProps {
    data: {
        label: string,
        link?: string,
    }[]
}

const HeaderAction = ({ data }: HeaderActionProps) => {
  return (
    <header className="px-4 flex h-16 shrink-0 items-center justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <BreadcrumbCustom data={data} icon={Slash} />
      </div>
      <div className="flex items-center gap-10 mr-6">
        <Input placeholder="Search something..." />
        <div className="flex items-center gap-4">
            <Settings size={20} />
            <Bell size={20} />
            <CircleUser size={20} />
        </div>
      </div>
    </header>
  );
};

export default HeaderAction;
