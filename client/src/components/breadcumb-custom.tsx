import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideIcon } from "lucide-react";

interface BreadcrumbCustomProps {
  data: {
    label: string;
    link?: string;
  }[];
  icon?: LucideIcon;
}

const BreadcrumbCustom = ({ data, icon: Icon }: BreadcrumbCustomProps) => {
  const navigate = useNavigate();

  return (
    <Breadcrumb>
      {data.length > 3 ? (
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={data[0].link}>{data[0].label}</BreadcrumbLink>
          </BreadcrumbItem>
          {Icon ? (
            <BreadcrumbSeparator>
              <Icon />
            </BreadcrumbSeparator>
          ) : (
            <BreadcrumbSeparator />
          )}
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {data.slice(1, data.length - 2).map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => navigate(item.link!)}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          {Icon ? (
            <BreadcrumbSeparator>
              <Icon />
            </BreadcrumbSeparator>
          ) : (
            <BreadcrumbSeparator />
          )}
          <BreadcrumbItem>
            <BreadcrumbLink href={data[data.length - 2].link}>
              {data[data.length - 2].label}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {Icon ? (
            <BreadcrumbSeparator>
              <Icon />
            </BreadcrumbSeparator>
          ) : (
            <BreadcrumbSeparator />
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>{data[data.length - 1].label}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      ) : (
        <BreadcrumbList>
          {data.map((item, index) => {
            if (index != data.length - 1) {
              return (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={item.link}>
                      {item.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {Icon ? (
                    <BreadcrumbSeparator>
                      <Icon />
                    </BreadcrumbSeparator>
                  ) : (
                    <BreadcrumbSeparator />
                  )}
                </>
              );
            } else {
              return (
                <BreadcrumbItem>
                  <BreadcrumbPage>{data[data.length - 1].label}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            }
          })}
        </BreadcrumbList>
      )}
    </Breadcrumb>
  );
};

export default BreadcrumbCustom;
