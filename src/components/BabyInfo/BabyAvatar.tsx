import { Avatar, AvatarProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { baby } from "../../assets";
import { calculateAge } from "../../utils";
import { CardWithIcon } from "../CardWithIcon";
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
    <CardWithIcon icon={<Avatar src={baby} {...props} />} title={name}>
      <Typography variant="body1">{ageMessage}</Typography>
    </CardWithIcon>
  );
}
