import {
  ButtonTypeMap,
  ExtendButtonBase,
  Button as MuiButton,
} from "@mui/material";

export const Button: ExtendButtonBase<ButtonTypeMap> = (props: any) => {
  return <MuiButton {...props} />;
};
