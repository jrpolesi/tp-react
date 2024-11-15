import { useEffect } from "react";
import {
  ErrorOption,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

type FormFieldsWithSubmit = {
  submit: void;
} & FieldValues;

export function useHandleSubmit<TFieldValues extends FormFieldsWithSubmit>(
  form: UseFormReturn<TFieldValues>,
  onSubmit: SubmitHandler<TFieldValues>,
  onError: (error: unknown) => ErrorOption
) {
  const { handleSubmit, setError, watch, clearErrors } = form;

  useEffect(() => {
    const subscription = watch(() =>
      clearErrors("submit" as Path<TFieldValues>)
    );
    return () => subscription.unsubscribe();
  }, [clearErrors, watch]);

  return handleSubmit(async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      setError("submit" as Path<TFieldValues>, onError(error));
    }
  });
}
