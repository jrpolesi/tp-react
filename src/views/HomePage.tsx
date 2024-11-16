import { BabyInfo, FabMenu, PageTemplate } from "../components";
import { useProfileData } from "../hooks";

export function HomePage() {
  const { data } = useProfileData();

  return (
    <PageTemplate>
      <h1>Home</h1>
      {data && <BabyInfo profile={data} />}

      <FabMenu />
    </PageTemplate>
  );
}
