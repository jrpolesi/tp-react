import {
  BoxProps,
  InputAdornment,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ApiError } from "../../errors";
import { useHandleSubmit } from "../../hooks";
import { BreastSide, FeedingType } from "../../types";
import {
  Alert,
  Box,
  ControlledDateTimePicker,
  ControlledTextField,
  ControlledToggleButtonGroup,
  SubmitButton,
} from "../Shared";

type FormFields = {
  submit: void;
  feedingType: FeedingType;
  observation: string;
  startDatetime: Dayjs;
  endDatetime?: Dayjs;
  breastSide?: BreastSide | null;
  amount?: number | null;
};

type FormSubmitValue = Omit<
  FormFields,
  "submit" | "startDatetime" | "endDatetime" | "feedingType" | "breastSide"
> & {
  feedingType: FeedingType;
  startDatetime: Date;
  endDatetime: Date | null;
  breastSide: BreastSide | null;
  amount: number | null;
};

type FeedFormProps = {
  defaultValue?: FormSubmitValue;
  onFormSubmit: (value: FormSubmitValue) => Promise<void>;
} & {
  sx?: BoxProps["sx"];
};

export function FeedForm({
  defaultValue,
  onFormSubmit,
  ...props
}: FeedFormProps) {
  const { t } = useTranslation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const form = useForm<FormFields>({
    defaultValues: {
      ...defaultValue,
      startDatetime:
        defaultValue?.startDatetime && dayjs(defaultValue?.startDatetime),
      endDatetime: defaultValue?.endDatetime
        ? dayjs(defaultValue?.endDatetime)
        : undefined,
    },
  });
  const { control, formState, reset, watch } = form;
  const { errors } = formState;

  async function onSubmit(values: FormFields) {
    if (values.feedingType === "bottle") {
      await onFormSubmit({
        feedingType: values.feedingType,
        amount: values.amount || null,
        startDatetime: values.startDatetime.toDate(),
        observation: values.observation,
        breastSide: null,
        endDatetime: null,
      });
    } else {
      await onFormSubmit({
        feedingType: values.feedingType,
        startDatetime: values.startDatetime.toDate(),
        endDatetime: values.endDatetime?.toDate() || null,
        observation: values.observation,
        breastSide: values.breastSide || null,
        amount: null,
      });
    }

    reset({
      ...values,
    });
  }

  const [feedingType, startDatetime] = watch(["feedingType", "startDatetime"]);

  const isBreastFeeding = feedingType === "breasts";
  const isBottleFeeding = feedingType === "bottle";

  const handleSubmit = useHandleSubmit(form, onSubmit, (error) => {
    let message = t(
      "feedForm.submit.errors.unknown",
      "Some unexpected error occurred"
    );

    if (error instanceof ApiError) {
      message = t(
        "feedForm.submit.errors.api",
        "Some unexpected error occurred while submitting the form"
      );
    }

    return {
      type: "api",
      message,
    };
  });

  const feedingTypeOptions = [
    {
      value: "bottle",
      label: t("feedForm.feedingType.options.bottle.label", "Bottle"),
    },
    {
      value: "breasts",
      label: t("feedForm.feedingType.options.breast.label", "Breast"),
    },
  ];

  const breastSideOptions = [
    {
      value: "left",
      label: t("feedForm.breastSide.options.left.label", "Left"),
    },
    {
      value: "right",
      label: t("feedForm.breastSide.options.right.label", "Right"),
    },
    {
      value: "both",
      label: t("feedForm.breastSide.options.both.label", "Both"),
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
        margin: "1rem auto 0",
        ...props.sx,
      }}
    >
      <Stack spacing={2.5}>
        <ControlledToggleButtonGroup
          name="feedingType"
          control={control}
          options={feedingTypeOptions}
          rules={{
            required: t(
              "feedForm.feedingType.errors.required",
              "Feeding type is required"
            ),
          }}
          label={t("feedForm.feedingType.label", "Feeding type")}
        />

        {isBreastFeeding && (
          <ControlledToggleButtonGroup
            name="breastSide"
            control={control}
            options={breastSideOptions}
            rules={{
              required: t(
                "feedForm.breastSide.errors.required",
                "Breast side is required"
              ),
            }}
            label={t("feedForm.breastSide.label", "Breast side")}
            toggleButtonGroupProps={{
              orientation: isMobile ? "vertical" : "horizontal",
            }}
          />
        )}

        {isBottleFeeding && (
          <ControlledTextField
            name="amount"
            type="number"
            control={control}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">ml</InputAdornment>
                ),
              },
            }}
            rules={{
              required: t(
                "feedForm.amount.errors.required",
                "Amount is required"
              ),
              min: {
                value: 1,
                message: t(
                  "feedForm.amount.errors.min",
                  "Amount must be greater than 1"
                ),
              },
              pattern: {
                value: /^[0-9]*$/,
                message: t(
                  "feedForm.amount.errors.decimal",
                  "Amount must be an integer"
                ),
              },
            }}
            label={t("feedForm.amount.label", "Amount")}
          />
        )}

        <ControlledDateTimePicker
          name="startDatetime"
          control={control}
          rules={{
            required: t(
              "feedForm.startDatetime.errors.required",
              "Start date is required"
            ),
          }}
          label={t("feedForm.startDatetime.label", "Start date")}
        />

        {isBreastFeeding && (
          <ControlledDateTimePicker
            name="endDatetime"
            control={control}
            rules={{
              required: t(
                "feedForm.endDatetime.errors.required",
                "End date is required"
              ),
              validate: (value) => {
                if (startDatetime && value?.isBefore(startDatetime)) {
                  return t(
                    "feedForm.endDatetime.errors.invalid",
                    "End date must be after start date"
                  );
                }

                return true;
              },
            }}
            label={t("feedForm.endDatetime.label", "End date")}
          />
        )}

        <ControlledTextField
          name="observation"
          control={control}
          multiline
          rows={4}
          rules={{
            required: t(
              "feedForm.observation.errors.required",
              "Observation is required"
            ),
          }}
          label={t("feedForm.observation.label", "Observation")}
        />
      </Stack>

      {errors.submit && <Alert severity="error">{errors.submit.message}</Alert>}

      <SubmitButton formState={formState}>
        {t("feedForm.submit.label", "Save")}
      </SubmitButton>
    </Box>
  );
}
