import ScaleIcon from "@mui/icons-material/Scale";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
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
    <Grid
      container
      alignItems="flex-end"
    >
      <Grid size="grow">
        <CardWithIcon
          icon={
            <SignalCellularAltIcon
              sx={{
                border: (theme) => `.2rem solid ${theme.palette.primary.main}`,
                borderRadius: "50%",
                padding: ".5rem",
                fontSize: "4rem",
                color: "primary.main",
              }}
            />
          }
          title={t("babyInfo.baby.length.label", "Length")}
          description={t("babyInfo.baby.length.value", "{{length}} cm", {
            replace: { length: profile.babyLength },
          })}
        />
      </Grid>

      <Grid size="grow">
        <BabyCardAvatar
          name={profile.babyName ?? ""}
          birthdate={profile.babyBirthdate}
          sx={{
            width: "10rem",
            height: "10rem",
          }}
        />
      </Grid>

      <Grid size="grow">
        <CardWithIcon
          icon={
            <ScaleIcon
              sx={{
                border: (theme) => `.2rem solid ${theme.palette.primary.main}`,
                borderRadius: "50%",
                padding: ".5rem",
                fontSize: "4rem",
                color: "primary.main",
              }}
            />
          }
          title={t("babyInfo.baby.weight.label", "Weight")}
          description={t("babyInfo.baby.weight.value", "{{weight}} kg", {
            replace: { weight: profile.babyWeight },
          })}
        />
      </Grid>
    </Grid>
  );
}
