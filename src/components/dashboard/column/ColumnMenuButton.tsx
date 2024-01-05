import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@nextui-org/react";
import { MoreHorizontalIcon } from "lucide-react";

import React from "react";
import ColumnMenu from "./ColumnMenu";

const ColumnMenuButton = ({ column }: { column: ColumnType }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <MoreHorizontalIcon className="text-black" size={15} />
      </PopoverTrigger>
      <PopoverContent>
        <ColumnMenu column={column} />
      </PopoverContent>
    </Popover>
  );
};

export default ColumnMenuButton;
