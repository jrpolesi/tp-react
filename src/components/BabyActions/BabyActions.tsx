import { Stack, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ActionCard } from "./ActionCard";

export type Action = {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  title: string;
  label: string;
  to: string;
  color: string;
};

type BabyActionsProps = {
  actions: Action[];
};

export function BabyActions({ actions }: BabyActionsProps) {
  return (
    <Stack
      flexDirection={{
        xs: "column",
        sm: "row",
      }}
      alignItems={{
        xs: "stretch",
        sm: "flex-end",
      }}
      justifyContent="center"
      flexWrap="wrap"
      gap={3}
    >
      {actions.map((action) => {
        return (
          <ActionCard
            action={action}
            sx={{
              minWidth: "10rem",
              backgroundColor: "background.default",
            }}
          />
        );
      })}
    </Stack>
  );
}
