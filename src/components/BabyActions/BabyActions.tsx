import { Stack, StackProps, SvgIconTypeMap } from "@mui/material";
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
  sx?: StackProps["sx"];
};

export function BabyActions({ actions, sx }: BabyActionsProps) {
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
      gap={{
        xs: 1.5,
        sm: 3,
      }}
      sx={sx}
    >
      {actions.map((action) => {
        return (
          <ActionCard
            key={action.title}
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
