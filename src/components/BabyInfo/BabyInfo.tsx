import ScaleIcon from "@mui/icons-material/Scale";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSessionContext } from "../../contexts";
import { CardWithIcon } from "../CardWithIcon";
import { Typography } from "../Typograph";
import { BabyCardAvatar } from "./BabyAvatar";

export function BabyInfo() {
  const { t } = useTranslation();

  const { user } = useSessionContext();
  if (!user) {
    throw new Error("User not found");
  }

  return (
    <Box>
      <CardWithIcon
        icon={<SignalCellularAltIcon />}
        title={t("babyInfo.baby.length.label", "Length")}
      >
        <Typography>
          {t("babyInfo.baby.length.value", "{{length}} cm", {
            replace: { length: user.babyLength },
          })}
        </Typography>
      </CardWithIcon>
      <BabyCardAvatar
        name={user.babyName ?? ""}
        birthdate={user.babyBirthdate}
      />
      <CardWithIcon
        icon={<ScaleIcon />}
        title={t("babyInfo.baby.weight.label", "Weight")}
      >
        <Typography>
          {t("babyInfo.baby.weight.value", "{{weight}} kg", {
            replace: { weight: user.babyWeight },
          })}
        </Typography>
      </CardWithIcon>
    </Box>
  );
}
