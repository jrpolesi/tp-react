import { LoadingButtonProps } from "@mui/lab";
import { PropsWithChildren } from "react";
import { FormState } from "react-hook-form";
import { LoadingButton } from "./MuiWrap";

type SubmitButtonProps = LoadingButtonProps &
  PropsWithChildren<{
    formState: FormState<any>;
  }>;

export function SubmitButton({
  formState,
  children,
  ...props
}: SubmitButtonProps) {
  const { isDirty, isLoading, isSubmitting } = formState;

  const isFormLoading = isLoading || isSubmitting;
  return (
    <LoadingButton
      type="submit"
      variant="contained"
      loading={isFormLoading}
      disabled={isFormLoading || !isDirty}
      size="large"
      {...props}
      sx={{
        alignSelf: "flex-end",
        textTransform: "none",
        ...props.sx,
      }}
    >
      {children}
    </LoadingButton>
  );
}
