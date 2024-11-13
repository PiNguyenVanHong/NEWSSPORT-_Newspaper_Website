"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertModal } from "@/components/modals/alert-modal";
import { ArticleColumn } from "./column";

interface CellActionProps {
  data: ArticleColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Category ID copied to the clipboard.");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${location.pathname}/categories/${data.id}`);
      toast.success("Category deleted.");
    } catch (error) {
      toast.error(
        "Make sure you removed all products using this category first!"
      );
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem className="group" onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 -4 group-hover:text-emerald-600 tranisiton duration-300" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            className="group"
            onClick={() => navigate(`/dashboard/articles/${data.id}`)}
          >
            <Edit className="mr-2 h-4 -4 group-hover:text-yellow-600 tranisiton duration-300" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem className="group" onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 -4 group-hover:text-destructive tranisiton duration-300" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
