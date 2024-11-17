import { Box, Palette, PaletteColor, useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useTranslation } from "react-i18next";
import { useItemsTheme } from "../../hooks";
import { ItemCount } from "../../types";

type ItemsByTypeProps = {
  data: ItemCount[];
};

export function ItemsByType({ data }: ItemsByTypeProps) {
  const { t } = useTranslation();

  const itemThemes = useItemsTheme();

  const { palette } = useTheme();

  return (
    <Box component="fieldset">
      <Box component="legend">
        {t("charts.itemsCount.title", "Items count by type")}
      </Box>

      <BarChart
        height={400}
        layout="horizontal"
        yAxis={[
          {
            data: data.map((item) => itemThemes[item.type].title),
            scaleType: "band",
            colorMap: {
              type: "ordinal",
              colors: data.map((item) => {
                const colorKey = itemThemes[item.type].color as keyof Palette;

                const color = palette[colorKey] as PaletteColor;

                return color.main;
              }),
            },
            tickLabelStyle: {
              angle: -45,
              textAnchor: "middle",
              fontSize: 12,
            },
          },
        ]}
        series={[
          {
            data: data.map((item) => item.count),
          },
        ]}
      />
    </Box>
  );
}
