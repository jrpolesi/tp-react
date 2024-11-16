import { DateTimePickerProps, PickerValidDate } from "@mui/x-date-pickers";
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { DateTimePicker } from "./DateTimePicker";

type ControlledDateTimePickerProps<
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> &
  Omit<DateTimePickerProps<TDate, TEnableAccessibleFieldDOMStructure>, "ref">;

export function ControlledDateTimePicker<
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean,
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
}: ControlledDateTimePickerProps<
  TDate,
  TEnableAccessibleFieldDOMStructure,
  TFieldValues,
  TName
>) {
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
    <DateTimePicker
      inputRef={ref}
      slotProps={{
        textField: {
          helperText: error?.message,
          error: !!error,
        },
      }}
      {...fieldRest}
      {...props}
    />
  );
}
