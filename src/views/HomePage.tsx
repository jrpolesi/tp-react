import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  Action,
  BabyActions,
  BabyInfo,
  BabyItemsList,
  CentralizedSpinner,
  Container,
  FabMenu,
} from "../components";
import { useProfileData } from "../hooks";

export function HomePage() {
  const { data, isLoading } = useProfileData();

  const actions = useBabyActions();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Container>
        <Box
          sx={{
            marginTop: "2.5rem",
          }}
        >
          {!data && isLoading && <CentralizedSpinner />}
          {data && <BabyInfo profile={data} />}
        </Box>
      </Container>

      <Box
        sx={{
          flex: "1",
          marginTop: "5.5rem",
          padding: "1rem 0 4rem",
          backgroundColor: "primary.main",
        }}
      >
        <Container
          sx={{
            marginTop: "-4rem",
          }}
        >
          <BabyActions actions={actions} />

          <BabyItemsList />
        </Container>
      </Box>
      <FabMenu />
    </Box>
  );
}

function useBabyActions(): Action[] {
  const { t } = useTranslation();

  return [
    {
      Icon: BedtimeIcon,
      title: t("homePage.babyActions.sleep.title", "Sleep"),
      label: t("homePage.babyActions.sleep.label", "Add new"),
      to: "/form?type=sleep",
      color: "purple",
    },
    {
      Icon: RestaurantMenuIcon,
      title: t("homePage.babyActions.feed.title", "Feed"),
      label: t("homePage.babyActions.feed.label", "Add new"),
      to: "/form?type=eat",
      color: "green",
    },
    {
      Icon: BabyChangingStationIcon,
      title: t("homePage.babyActions.diaper.title", "Diaper"),
      label: t("homePage.babyActions.diaper.label", "Add new"),
      to: "/form?type=diaper",
      color: "salmon",
    },
  ];
}
