import { BoxProps, InputAdornment, Stack } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ApiError } from "../errors";
import { useHandleSubmit } from "../hooks";
import {
  Alert,
  Box,
  ControlledDatePicker,
  ControlledTextField,
  LoadingButton,
} from "./Shared/MuiWrap";

type FormFields = {
  submit: void;
  babyName: string;
  babyWeight: string;
  babyLength: string;
  babyBirthdate: Dayjs;
};

type FormSubmitValue = Omit<
  FormFields,
  "submit" | "babyBirthdate" | "babyWeight" | "babyLength"
> & {
  babyBirthdate: Date;
  babyWeight: number;
  babyLength: number;
};

type BabyFormProps = {
  defaultValue: FormSubmitValue;
  onFormSubmit: (value: FormSubmitValue) => Promise<void>;
} & {
  sx?: BoxProps["sx"];
};

export function BabyForm({
  onFormSubmit,
  defaultValue,
  ...props
}: BabyFormProps) {
  const { t } = useTranslation();

  const form = useForm<FormFields>({
    defaultValues: {
      babyName: defaultValue.babyName,
      babyLength: defaultValue.babyLength.toString(),
      babyWeight: defaultValue.babyWeight.toString(),
      babyBirthdate: dayjs(defaultValue.babyBirthdate),
    },
  });
  const { control, formState } = form;
  const { errors, isLoading, isSubmitting } = formState;

  async function onSubmit(values: FormFields) {
    await onFormSubmit({
      ...values,
      babyBirthdate: values.babyBirthdate.toDate(),
      babyLength: parseInt(values.babyLength),
      babyWeight: parseFloat(values.babyWeight),
    });
  }

  const handleSubmit = useHandleSubmit(form, onSubmit, (error) => {
    let message = t(
      "babyForm.submit.errors.unknown",
      "Some unexpected error occurred"
    );

    if (error instanceof ApiError) {
      message = t(
        "babyForm.submit.errors.api",
        "Some unexpected error occurred while submitting the form"
      );
    }

    return {
      type: "api",
      message,
    };
  });

  const isFormLoading = isLoading || isSubmitting;

  return (
    <Box
      component="form"
      autoComplete="off"
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
        <ControlledTextField
          name="babyName"
          control={control}
          rules={{
            required: t(
              "babyForm.babyName.errors.required",
              "Baby name is required"
            ),
          }}
          label={t("babyForm.babyName.label", "Name")}
        />

        <ControlledDatePicker
          name="babyBirthdate"
          control={control}
          rules={{
            required: t(
              "babyForm.babyBirthDate.errors.required",
              "Baby birth date is required"
            ),
            validate: (value) => {
              if (value.isAfter(dayjs())) {
                return t(
                  "babyForm.babyBirthDate.errors.future",
                  "Baby birth date can't be in the future"
                );
              }

              return true;
            },
          }}
          label={t("babyForm.babyBirthDate.label", "Birth date")}
          disableFuture
        />

        <ControlledTextField
          name="babyLength"
          type="number"
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            },
          }}
          control={control}
          rules={{
            required: t(
              "babyForm.babyLength.errors.required",
              "Baby length is required"
            ),
            min: {
              value: 1,
              message: t(
                "babyForm.babyLength.errors.min",
                "Baby length must be greater than 1"
              ),
            },
            pattern: {
              value: /^[0-9]*$/,
              message: t(
                "babyForm.babyLength.errors.decimal",
                "Baby length must be an integer"
              ),
            },
          }}
          label={t("babyForm.babyLength.label", "Length")}
        />

        <ControlledTextField
          name="babyWeight"
          type="number"
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            },
          }}
          control={control}
          rules={{
            required: t(
              "babyForm.babyWeight.errors.required",
              "Baby weight is required"
            ),
            min: {
              value: 1,
              message: t(
                "babyForm.babyWeight.errors.min",
                "Baby weight must be greater than 1"
              ),
            },
          }}
          label={t("babyForm.babyWeight.label", "Weight")}
        />
      </Stack>

      {errors.submit && <Alert severity="error">{errors.submit.message}</Alert>}

      <LoadingButton
        type="submit"
        variant="contained"
        loading={isFormLoading}
        disabled={isFormLoading}
        size="large"
        sx={{
          alignSelf: "flex-end",
        }}
      >
        {t("babyForm.submit.label", "Save")}
      </LoadingButton>
    </Box>
  );
}
