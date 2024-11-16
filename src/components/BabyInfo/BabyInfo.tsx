import ScaleIcon from "@mui/icons-material/Scale";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Profile } from "../../types";
import { CardWithIcon, Typography } from "../Shared";
import { BabyCardAvatar } from "./BabyAvatar";

type BabyInfoProps = {
  profile: Profile;
};

export function BabyInfo({ profile }: BabyInfoProps) {
  const { t } = useTranslation();

  return (
    <Box>
      <CardWithIcon
        icon={<SignalCellularAltIcon />}
        title={t("babyInfo.baby.length.label", "Length")}
      >
        <Typography>
          {t("babyInfo.baby.length.value", "{{length}} cm", {
            replace: { length: profile.babyLength },
          })}
        </Typography>
      </CardWithIcon>
      <BabyCardAvatar
        name={profile.babyName ?? ""}
        birthdate={profile.babyBirthdate}
      />
      <CardWithIcon
        icon={<ScaleIcon />}
        title={t("babyInfo.baby.weight.label", "Weight")}
      >
        <Typography>
          {t("babyInfo.baby.weight.value", "{{weight}} kg", {
            replace: { weight: profile.babyWeight },
          })}
        </Typography>
      </CardWithIcon>
    </Box>
  );
}
