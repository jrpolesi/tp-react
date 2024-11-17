import { BoxProps, Stack, useMediaQuery, useTheme } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ApiError } from "../../errors";
import { useHandleSubmit } from "../../hooks";
import { DiaperStatus } from "../../types";
import {
  Alert,
  Box,
  ControlledDateTimePicker,
  ControlledTextField,
  ControlledToggleButtonGroup,
  SubmitButton,
} from "../Shared";

type DiaperStatusOption = {
  value: DiaperStatus;
  label: string;
};

type FormFields = {
  submit: void;
  observation: string;
  startDatetime: Dayjs;
  diaperStatus: DiaperStatus | null;
};

type FormSubmitValue = Omit<FormFields, "submit" | "startDatetime"> & {
  startDatetime: Date;
};

type DiaperFormProps = {
  defaultValue?: FormSubmitValue;
  onFormSubmit: (value: FormSubmitValue) => Promise<void>;
} & {
  sx?: BoxProps["sx"];
};

export function DiaperForm({
  defaultValue,
  onFormSubmit,
  ...props
}: DiaperFormProps) {
  const { t } = useTranslation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(defaultValue);
  const form = useForm<FormFields>({
    defaultValues: {
      observation: defaultValue?.observation,
      diaperStatus: defaultValue?.diaperStatus,
      startDatetime:
        defaultValue?.startDatetime && dayjs(defaultValue?.startDatetime),
    },
  });
  const { control, formState, reset } = form;
  const { errors } = formState;

  async function onSubmit(values: FormFields) {
    await onFormSubmit({
      ...values,
      startDatetime: values.startDatetime.toDate(),
    });

    reset({
      ...values,
    });
  }

  const handleSubmit = useHandleSubmit(form, onSubmit, (error) => {
    let message = t(
      "diaperForm.submit.errors.unknown",
      "Some unexpected error occurred"
    );

    if (error instanceof ApiError) {
      message = t(
        "diaperForm.submit.errors.api",
        "Some unexpected error occurred while submitting the form"
      );
    }

    return {
      type: "api",
      message,
    };
  });

  const diaperStatusOptions: DiaperStatusOption[] = [
    {
      value: "clean",
      label: t("diaperForm.diaperStatus.options.clean.label", "Clean"),
    },
    {
      value: "wet",
      label: t("diaperForm.diaperStatus.options.wet.label", "Wet"),
    },
    {
      value: "dirty",
      label: t("diaperForm.diaperStatus.options.dirty.label", "Dirty"),
    },
    {
      value: "wet_dirty",
      label: t("diaperForm.diaperStatus.options.both.label", "Both"),
    },
  ];

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
        ...props.sx,
      }}
    >
      <Stack spacing={2.5}>
        <ControlledToggleButtonGroup
          name="diaperStatus"
          control={control}
          options={diaperStatusOptions}
          rules={{
            required: t(
              "diaperForm.diaperStatus.errors.required",
              "Diaper state is required"
            ),
          }}
          label={t("diaperForm.diaperStatus.label", "Diaper state")}
          toggleButtonGroupProps={{
            orientation: isMobile ? "vertical" : "horizontal",
          }}
        />

        <ControlledDateTimePicker
          name="startDatetime"
          control={control}
          rules={{
            required: t(
              "diaperForm.startDatetime.errors.required",
              "Date is required"
            ),
          }}
          label={t("diaperForm.startDatetime.label", "Date")}
        />

        <ControlledTextField
          name="observation"
          control={control}
          multiline
          rows={4}
          rules={{
            required: t(
              "diaperForm.observation.errors.required",
              "Observation is required"
            ),
          }}
          label={t("diaperForm.observation.label", "Observation")}
        />
      </Stack>

      {errors.submit && <Alert severity="error">{errors.submit.message}</Alert>}

      <SubmitButton formState={formState}>
        {t("diaperForm.submit.label", "Save")}
      </SubmitButton>
    </Box>
  );
}
