import { Avatar, AvatarProps, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { baby } from "../../assets";
import { calculateAge } from "../../utils";
import { Typography } from "../Shared";

export type BabyAvatarProps = AvatarProps & {
  name: string;
  birthdate: Date;
};

export function BabyCardAvatar({ name, birthdate, ...props }: BabyAvatarProps) {
  const { t } = useTranslation();

  const age = calculateAge(birthdate);

  let ageDayMessage = t("babyInfo.baby.age.days", "{{days}} days", {
    count: age.days,
    replace: { days: age.days },
  });

  let ageYearMessage = t("babyInfo.baby.age.years", "{{years}} years and", {
    count: age.years,
    replace: { years: age.years },
  });

  let ageMessage = ageDayMessage;

  if (age.years) {
    ageMessage = `${ageYearMessage} ${ageDayMessage}`;
  }

  return (
    <Stack alignItems="center" gap=".9rem">
      <Avatar src={baby} {...props} />

      <Stack
        alignItems="center"
        gap={{
          xs: ".2rem",
          sm: ".25rem",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: {
              xs: "1rem",
              sm: "1.5rem",
            },
            fontWeight: {
              xs: "600",
              sm: "500",
            },
            lineHeight: "1",
          }}
        >
          {name}
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: ".9rem",
              sm: "1rem",
            },
          }}
        >
          {ageMessage}
        </Typography>
      </Stack>
    </Stack>
  );
}
