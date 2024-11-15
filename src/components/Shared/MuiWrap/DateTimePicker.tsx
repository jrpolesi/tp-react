import {
  DateTimePicker as MuiDateTimePicker,
  DateTimePickerProps as MuiDateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";
import { PickerValidDate } from "@mui/x-date-pickers/models";

type DateTimePickerProps<
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false
> = MuiDateTimePickerProps<TDate, TEnableAccessibleFieldDOMStructure>;

export function DateTimePicker<
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean
>(props: DateTimePickerProps<TDate, TEnableAccessibleFieldDOMStructure>) {
  return <MuiDateTimePicker {...props} />;
}
