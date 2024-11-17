import { Stack, StackProps } from "@mui/material";
import { ItemCount } from "../../types";
import { ItemsByType } from "./ItemsByType";

type ChartsProps = {
  data: {
    itemsCount: ItemCount[];
  };
  sx?: StackProps["sx"];
};

export function Charts({ data, sx }: ChartsProps) {
  return (
    <Stack sx={sx}>
      <ItemsByType data={data.itemsCount} />
    </Stack>
  );
}
