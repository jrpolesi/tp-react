import { DatePickerProps, PickerValidDate } from "@mui/x-date-pickers";
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { DatePicker } from "./DatePicker";

type ControlledDatePickerProps<
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> &
  Omit<DatePickerProps<TDate, TEnableAccessibleFieldDOMStructure>, "ref">;

export function ControlledDatePicker<
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
}: ControlledDatePickerProps<
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
    <DatePicker
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
