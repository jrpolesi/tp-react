import {
  BoxProps,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
  useTheme,
} from "@mui/material";
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { Box } from "./Box";
import { Typography } from "./Typography";

type Option = {
  value: string;
  label: string;
};

export type ControlledToggleButtonGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & {
  label?: string;
  options: Option[];
  sx?: BoxProps["sx"];
  toggleButtonGroupProps?: ToggleButtonGroupProps;
};

export function ControlledToggleButtonGroup<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  rules,
  disabled,
  shouldUnregister,
  defaultValue,
  options,
  label,
  sx,
  toggleButtonGroupProps,
}: ControlledToggleButtonGroupProps<TFieldValues, TName>) {
  const { palette } = useTheme();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    disabled,
    shouldUnregister,
    defaultValue,
  });

  return (
    <Box sx={sx}>
      <Box
        component="fieldset"
        borderColor="error"
        sx={{
          borderRadius: "4px",
          borderWidth: "1px",
          borderColor: error ? palette.error.main : palette.grey[300],
        }}
      >
        <Box
          component="legend"
          sx={{
            color: error ? palette.error.main : "unset",
          }}
        >
          {label}
        </Box>
        <ToggleButtonGroup
          fullWidth
          exclusive
          color="primary"
          {...field}
          {...toggleButtonGroupProps}
        >
          {options.map((option) => (
            <ToggleButton key={option.value} value={option.value}>
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      {error && (
        <Typography color="error" fontSize="small" margin="3px 14px 0">
          {error.message}
        </Typography>
      )}
    </Box>
  );
}
