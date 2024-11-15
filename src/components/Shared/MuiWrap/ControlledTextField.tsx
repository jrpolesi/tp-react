import { TextFieldProps } from "@mui/material";
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { TextField } from "./TextField";

type ControlledTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & Omit<TextFieldProps, "ref">;

export function ControlledTextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  rules,
  disabled,
  shouldUnregister,
  defaultValue,
  inputRef,
  ...props
}: ControlledTextFieldProps<TFieldValues, TName>) {
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

  const { ref, ...fieldRest } = field;

  return (
    <TextField
      helperText={error?.message}
      error={!!error}
      inputRef={ref}
      {...fieldRest}
      {...props}
    />
  );
}
