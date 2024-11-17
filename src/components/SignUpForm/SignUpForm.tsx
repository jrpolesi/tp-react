import { BoxProps, InputAdornment, Stack } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ApiError } from "../../errors";
import { useHandleSubmit } from "../../hooks";
import {
  Alert,
  Box,
  ControlledDatePicker,
  ControlledTextField,
  SubmitButton,
} from "../Shared";

type FormFields = {
  submit: void;
  babyName: string;
  babyWeight: string;
  babyLength: string;
  babyBirthdate: Dayjs;
  username: string;
  email: string;
  password: string;
};

type FormSubmitValue = Omit<
  FormFields,
  "submit" | "babyBirthdate" | "babyWeight" | "babyLength"
> & {
  babyBirthdate: Date;
  babyWeight: number;
  babyLength: number;
};

type SignUpFormProps = {
  onFormSubmit: (value: FormSubmitValue) => Promise<void>;
} & {
  sx?: BoxProps["sx"];
};

export function SignUpForm({ onFormSubmit, ...props }: SignUpFormProps) {
  const { t } = useTranslation();

  const form = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
      babyBirthdate: dayjs(new Date(Date.now())),
      babyLength: "",
      babyName: "",
      babyWeight: "",
      username: "",
    },
  });
  const { control, formState } = form;
  const { errors } = formState;

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
      "signUpForm.submit.errors.unknown",
      "Some unexpected error occurred"
    );

    if (error instanceof ApiError) {
      message = t(
        "signUpForm.submit.errors.api",
        "Some unexpected error occurred while submitting the form, please check your email"
      );
    }

    return {
      type: "api",
      message,
    };
  });

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
      <Stack
        component="fieldset"
        spacing={2.5}
        sx={{
          border: (theme) => `.175rem solid ${theme.palette.primary.main}`,
          borderRadius: "4px",
        }}
      >
        <Box component="legend">{t("signUpForm.baby.label", "Your baby")}</Box>

        <ControlledTextField
          name="babyName"
          control={control}
          rules={{
            required: t(
              "signUpForm.babyName.errors.required",
              "Baby name is required"
            ),
          }}
          label={t("signUpForm.babyName.label", "Name")}
        />

        <ControlledDatePicker
          name="babyBirthdate"
          control={control}
          rules={{
            required: t(
              "signUpForm.babyBirthDate.errors.required",
              "Baby birth date is required"
            ),
            validate: (value) => {
              if (value.isAfter(dayjs())) {
                return t(
                  "signUpForm.babyBirthDate.errors.future",
                  "Baby birth date can't be in the future"
                );
              }

              return true;
            },
          }}
          label={t("signUpForm.babyBirthDate.label", "Birth date")}
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
              "signUpForm.babyLength.errors.required",
              "Baby length is required"
            ),
            min: {
              value: 1,
              message: t(
                "signUpForm.babyLength.errors.min",
                "Baby length must be greater than 1"
              ),
            },
            pattern: {
              value: /^[0-9]*$/,
              message: t(
                "signUpForm.babyLength.errors.decimal",
                "Baby length must be an integer"
              ),
            },
          }}
          label={t("signUpForm.babyLength.label", "Length")}
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
              "signUpForm.babyWeight.errors.required",
              "Baby weight is required"
            ),
            min: {
              value: 1,
              message: t(
                "signUpForm.babyWeight.errors.min",
                "Baby weight must be greater than 1"
              ),
            },
          }}
          label={t("signUpForm.babyWeight.label", "Weight")}
        />
      </Stack>
      <Stack spacing={2.5}>
        <ControlledTextField
          name="username"
          control={control}
          rules={{
            required: t(
              "signUpForm.username.errors.required",
              "Name is required"
            ),
          }}
          label={t("signUpForm.username.label", "Your name")}
        />

        <ControlledTextField
          name="email"
          control={control}
          rules={{
            required: t(
              "signUpForm.email.errors.required",
              "Email is required"
            ),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: t(
                "signUpForm.email.errors.invalid",
                "Invalid email address"
              ),
            },
          }}
          label={t("signUpForm.email.label", "Email")}
        />

        <ControlledTextField
          name="password"
          control={control}
          type="password"
          rules={{
            required: t(
              "signUpForm.password.errors.required",
              "Password is required"
            ),
            minLength: {
              value: 6,
              message: t(
                "signUpForm.password.errors.minLength",
                "Password must be at least 6 characters"
              ),
            },
          }}
          label={t("signUpForm.password.label", "Password")}
        />
      </Stack>

      {errors.submit && <Alert severity="error">{errors.submit.message}</Alert>}

      <SubmitButton formState={formState}>
        {t("signUpForm.submit.label", "Sign Up")}
      </SubmitButton>
    </Box>
  );
}
