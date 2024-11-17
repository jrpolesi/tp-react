import ScaleIcon from "@mui/icons-material/Scale";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { SvgIconOwnProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Profile } from "../../types";
import { CardWithIcon, Grid } from "../Shared";
import { BabyCardAvatar } from "./BabyAvatar";

type BabyInfoProps = {
  profile: Profile;
};

export function BabyInfo({ profile }: BabyInfoProps) {
  const { t } = useTranslation();

  return (
    <Grid container alignItems="flex-end">
      <Grid size="grow">
        <CardWithIcon
          icon={<SignalCellularAltIcon sx={iconStyle} />}
          title={t("babyInfo.baby.length.label", "Length")}
          description={t("babyInfo.baby.length.value", "{{length}} cm", {
            replace: { length: profile.babyLength },
          })}
        />
      </Grid>

      <Grid size="grow">
        <BabyCardAvatar
          name={profile.babyName}
          birthdate={profile.babyBirthdate}
          sx={{
            width: {
              xs: "6rem",
              sm: "10rem",
            },
            height: {
              xs: "6rem",
              sm: "10rem",
            },
          }}
        />
      </Grid>

      <Grid size="grow">
        <CardWithIcon
          icon={<ScaleIcon sx={iconStyle} />}
          title={t("babyInfo.baby.weight.label", "Weight")}
          description={t("babyInfo.baby.weight.value", "{{weight}} kg", {
            replace: { weight: profile.babyWeight },
          })}
        />
      </Grid>
    </Grid>
  );
}

const iconStyle: SvgIconOwnProps["sx"] = {
  border: (theme) => `.2rem solid ${theme.palette.primary.main}`,
  borderRadius: "50%",
  padding: ".5rem",
  fontSize: {
    xs: "3rem",
    sm: "4rem",
  },
  color: "primary.main",
};
