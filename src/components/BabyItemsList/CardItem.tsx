import { Stack, StackProps } from "@mui/material";
import { Link } from "react-router-dom";
import { useThemeByItemType } from "../../hooks";
import { Item } from "../../types";
import { Typography } from "../Shared";

type CardItemProps = {
  item: Item;
  sx?: StackProps["sx"];
};

export function CardItem({ item, sx }: CardItemProps) {
  const itemTheme = useThemeByItemType(item.type);

  return (
    <Stack
      component={Link}
      to={`/form/${item.id}`}
      sx={{
        textDecoration: "none",
        color: "text.primary",
        bgcolor: "background.default",
        borderRadius: "8px",
        padding: ".5rem",
        flexDirection: "row",
        alignItems: "center",
        gap: "1rem",
        ...sx,
      }}
    >
      <itemTheme.Icon
        sx={{
          bgcolor: `${itemTheme.color}.main`,
          color: `${itemTheme.color}.contrastText`,
          borderRadius: "4px",
          fontSize: "2.5rem",
        }}
      />

      <Stack sx={{ maxWidth: "100%", overflow: "hidden", gap: ".125rem" }}>
        <Typography variant="h3" fontSize="1rem" fontWeight="bold" noWrap>
          {itemTheme.title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          fontSize={{
            xs: ".875rem",
            sm: "1rem",
          }}
          noWrap
        >
          {item.observation}
        </Typography>
      </Stack>
    </Stack>
  );
}
