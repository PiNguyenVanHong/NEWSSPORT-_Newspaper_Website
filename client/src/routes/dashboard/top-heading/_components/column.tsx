import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { isTopHeading } from "./data";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { CellAction } from "./cell-action";

export type TopHeadingColumn = {
  id: string;
  title: string;
  category: string;
  date: string;
  isTopHeading: string;
  creator: string;
};

export const columns: ColumnDef<TopHeadingColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <span className="capitalize">{row.original.title}</span>,
  },
  {
    accessorKey: "creator",
    header: "Creator",
    cell: ({ row }) => <span className="capitalize">{row.original.creator}</span>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <span className="capitalize">{row.original.category}</span>,
  },
  {
    accessorKey: "isTopHeading",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Heading" />
    ),
    cell: ({ row }) => {
      const headings = isTopHeading.find(
        (item) => item.value === row.getValue("isTopHeading")
      );

      if (!headings) {
        return null;
      }
      
      return (
        <div className="flex w-[100px] items-center">
          {headings.icon && (
            <headings.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{headings.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
