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
import { useProfileData, useThemeByItemType } from "../hooks";

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
            marginTop: {
              xs: "1.8rem",
              sm: "2.5rem",
            },
          }}
        >
          {!data && isLoading && (
            <CentralizedSpinner
              sx={{
                minHeight: { xs: "9.5rem", sm: "14rem" },
              }}
            />
          )}
          {data && <BabyInfo profile={data} />}
        </Box>
      </Container>

      <Box
        sx={{
          flex: "1",
          marginTop: {
            xs: "4rem",
            sm: "5.5rem",
          },
          padding: "1rem 0 4rem",
          backgroundColor: "primary.main",
        }}
      >
        <Container
          sx={{
            marginTop: {
              xs: "-3rem",
              sm: "-4rem",
            },
          }}
        >
          <BabyActions
            actions={actions}
            sx={{
              marginBottom: {
                xs: "2rem",
                sm: "3.5rem",
              },
            }}
          />

          <BabyItemsList />
        </Container>
      </Box>
      <FabMenu />
    </Box>
  );
}

function useBabyActions(): Action[] {
  const { t } = useTranslation();

  const sleepTheme = useThemeByItemType("sleep");
  const eatTheme = useThemeByItemType("eat");
  const diaperTheme = useThemeByItemType("diaper");

  const actionLabel = t("homePage.babyActions.action.label", "Add new");

  return [
    {
      to: "/form?type=sleep",
      label: actionLabel,
      ...sleepTheme,
    },
    {
      to: "/form?type=eat",
      label: actionLabel,
      ...eatTheme,
    },
    {
      to: "/form?type=diaper",
      label: actionLabel,
      ...diaperTheme,
    },
  ];
}
