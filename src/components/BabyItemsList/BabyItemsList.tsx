import { Stack } from "@mui/material";
import { useRef } from "react";
import { useSessionContext } from "../../contexts";
import { useInfiniteScroll, useItemsData } from "../../hooks";
import { CentralizedSpinner } from "../Shared";
import { CardItem } from "./CardItem";

export function BabyItemsList() {
  const { user } = useSessionContext();

  const { data, isLoading, fetchNextPage } = useItemsData(user?.id ?? "");

  const ref = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll(ref, fetchNextPage);

  return (
    <Stack>
      {data?.length && (
        <Stack component="div" gap={2} ref={ref}>
          {data.map((item) => (
            <CardItem key={item.id} item={item} />
          ))}
        </Stack>
      )}

      {isLoading && (
        <CentralizedSpinner
          sx={{
            minHeight: { xs: "6rem" },
          }}
          spinnerProps={{ sx: { color: "primary.contrastText" } }}
        />
      )}
    </Stack>
  );
}
