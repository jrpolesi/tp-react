import { useItemsData } from "../hooks";

export function BabyItemsList() {
  const { data, error, isLoading, pagination } = useItemsData();
  console.log(data, error, isLoading, pagination);
  return null;
}
