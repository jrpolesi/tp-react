import { BoxProps, Box as MuiBox, Theme } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { BoxTypeMap } from "@mui/system";

export const Box: OverridableComponent<BoxTypeMap<{}, "div", Theme>> = (
  props: BoxProps
) => {
  return <MuiBox {...props} />;
};
