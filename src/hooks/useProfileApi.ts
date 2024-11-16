import { useApiContext } from "../contexts";

export function useProfileApi() {
  const api = useApiContext();
  
  return api.profile;
}
