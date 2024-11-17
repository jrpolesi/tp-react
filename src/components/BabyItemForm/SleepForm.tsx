import { BoxProps, Stack } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ApiError } from "../../errors";
import { useHandleSubmit } from "../../hooks";
import {
  Alert,
  Box,
  ControlledDateTimePicker,
  ControlledTextField,
  SubmitButton,
} from "../Shared";

type FormFields = {
  submit: void;
  observation: string;
  startDatetime: Dayjs;
  endDatetime: Dayjs;
};

type FormSubmitValue = Omit<
  FormFields,
  "submit" | "startDatetime" | "endDatetime"
> & {
  startDatetime: Date;
  endDatetime: Date;
};

type SleepFormProps = {
  defaultValue?: FormSubmitValue;
  onFormSubmit: (value: FormSubmitValue) => Promise<void>;
} & {
  sx?: BoxProps["sx"];
};

export function SleepForm({
  defaultValue,
  onFormSubmit,
  ...props
}: SleepFormProps) {
  const { t } = useTranslation();

  const form = useForm<FormFields>({
    defaultValues: {
      ...defaultValue,
      startDatetime: dayjs(defaultValue?.startDatetime),
      endDatetime: dayjs(defaultValue?.endDatetime),
    },
  });
  const { control, formState, reset, watch } = form;
  const { errors } = formState;

  async function onSubmit(values: FormFields) {
    await onFormSubmit({
      ...values,
      startDatetime: values.startDatetime.toDate(),
      endDatetime: values.endDatetime.toDate(),
    });

    reset({
      ...values,
    });
  }

  const handleSubmit = useHandleSubmit(form, onSubmit, (error) => {
    let message = t(
      "sleepForm.submit.errors.unknown",
      "Some unexpected error occurred"
    );

    if (error instanceof ApiError) {
      message = t(
        "sleepForm.submit.errors.api",
        "Some unexpected error occurred while submitting the form"
      );
    }

    return {
      type: "api",
      message,
    };
  });

  const startDatetime = watch("startDatetime");

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "34rem",
        margin: "auto",
        ...props.sx,
      }}
    >
      <Stack spacing={2.5}>
        <ControlledDateTimePicker
          name="startDatetime"
          control={control}
          rules={{
            required: t(
              "sleepForm.startDatetime.errors.required",
              "Start date is required"
            ),
          }}
          label={t("sleepForm.startDatetime.label", "Start date")}
        />

        <ControlledDateTimePicker
          name="endDatetime"
          control={control}
          rules={{
            required: t(
              "sleepForm.endDatetime.errors.required",
              "End date is required"
            ),
            validate: (value) => {
              if (startDatetime && value.isBefore(startDatetime)) {
                return t(
                  "sleepForm.endDatetime.errors.invalid",
                  "End date must be after start date"
                );
              }

              return true;
            },
          }}
          label={t("sleepForm.endDatetime.label", "End date")}
        />

        <ControlledTextField
          name="observation"
          control={control}
          multiline
          rows={4}
          rules={{
            required: t(
              "sleepForm.observation.errors.required",
              "Observation is required"
            ),
          }}
          label={t("sleepForm.observation.label", "Observation")}
        />
      </Stack>

      {errors.submit && <Alert severity="error">{errors.submit.message}</Alert>}

      <SubmitButton formState={formState}>
        {t("sleepForm.submit.label", "Save")}
      </SubmitButton>
    </Box>
  );
}
