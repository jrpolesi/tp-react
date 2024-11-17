import { ItemType } from "../types";
import { useItemsTheme } from "./useItemsTheme";

export function useThemeByItemType(itemType: ItemType) {
  const itemsTheme = useItemsTheme();

  return itemsTheme[itemType];
}
