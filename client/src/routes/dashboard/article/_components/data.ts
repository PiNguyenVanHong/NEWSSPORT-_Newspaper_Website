import { CircleCheck, CircleX } from "lucide-react";

export const statuses = [
    {
      value: "PENDING",
      label: "Pending",
      icon: CircleCheck,
    },
    {
      value: "APPROVED",
      label: "Approved",
      icon: CircleX,
    },
    {
      value: "REJECTED",
      label: "Rejected",
      icon: CircleCheck,
    },
    {
      value: "PUBLISHED",
      label: "Published",
      icon: CircleX,
    },
  ];
  
//   export const priorities = [
//     {
//       label: "Low",
//       value: "low",
//       icon: ArrowDownIcon,
//     },
//     {
//       label: "Medium",
//       value: "medium",
//       icon: ArrowRightIcon,
//     },
//     {
//       label: "High",
//       value: "high",
//       icon: ArrowUpIcon,
//     },
//   ];