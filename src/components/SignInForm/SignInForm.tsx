import { BoxProps, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ApiError } from "../../errors";
import { useHandleSubmit } from "../../hooks";
import { Alert, Box, ControlledTextField, LoadingButton } from "../Shared";

type FormFields = {
  submit: void;
  email: string;
  password: string;
};

type FormSubmitValue = Omit<FormFields, "submit">;

type SignInFormProps = {
  onFormSubmit: (value: FormSubmitValue) => Promise<void>;
} & {
  sx?: BoxProps["sx"];
};

export function SignInForm({ onFormSubmit, ...props }: SignInFormProps) {
  const { t } = useTranslation();

  const form = useForm<FormFields>({
    defaultValues: { email: "", password: "" },
  });
  const { control, formState, setError } = form;
  const { errors, isLoading, isSubmitting } = formState;

  async function onSubmit({ email, password }: FormFields) {
    try {
      await onFormSubmit({
        email,
        password,
      });
    } catch (error) {
      let message = t(
        "signInForm.submit.errors.unknown",
        "Some unexpected error occurred"
      );

      if (error instanceof ApiError) {
        message = t("signInForm.submit.errors.api", "Wrong email or password");
      }

      setError("submit", {
        type: "api",
        message,
      });
    }
  }

  const handleSubmit = useHandleSubmit(form, onSubmit, (error) => {
    let message = t(
      "signInForm.submit.errors.unknown",
      "Some unexpected error occurred"
    );

    if (error instanceof ApiError) {
      message = t("signInForm.submit.errors.api", "Wrong email or password");
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
          name="email"
          control={control}
          rules={{
            required: t(
              "signInForm.email.errors.required",
              "Email is required"
            ),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: t(
                "signInForm.email.errors.invalid",
                "Invalid email address"
              ),
            },
          }}
          label={t("signInForm.email.label", "Email")}
        />

        <ControlledTextField
          name="password"
          control={control}
          rules={{
            required: t(
              "signInForm.password.errors.required",
              "Password is required"
            ),
            minLength: {
              value: 6,
              message: t(
                "signInForm.password.errors.minLength",
                "Password must be at least 6 characters"
              ),
            },
          }}
          label={t("signInForm.password.label", "Password")}
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
        {t("signInForm.submit.label", "Sign In")}
      </LoadingButton>
    </Box>
  );
}
