import { Stack } from "@mui/material";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSessionContext } from "../../contexts";
import { useInfiniteScroll, useItemsData } from "../../hooks";
import { Alert, CentralizedSpinner } from "../Shared";
import { CardItem } from "./CardItem";

export function BabyItemsList() {
  const { t } = useTranslation();
  const { user } = useSessionContext();

  const { data, error, isLoading, fetchNextPage } = useItemsData(
    user?.id ?? ""
  );

  const ref = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll(ref, fetchNextPage);

  return (
    <Stack>
      {!!error && (
        <Alert severity="error">
          {t(
            "babyItemsList.error",
            "An error occurred while fetching baby items data"
          )}
        </Alert>
      )}

      {!!data?.length && (
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
