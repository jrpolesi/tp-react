import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import { PickerValidDate } from "@mui/x-date-pickers/models";

type DatePickerProps<
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false
> = MuiDatePickerProps<TDate, TEnableAccessibleFieldDOMStructure>;

export function DatePicker<
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean
>(props: DatePickerProps<TDate, TEnableAccessibleFieldDOMStructure>) {
  return <MuiDatePicker {...props} />;
}
