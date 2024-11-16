import { BabyInfo, FabMenu, PageTemplate } from "../components";

export function HomePage() {
  return (
    <PageTemplate>
      <h1>Home</h1>
      <BabyInfo />

      <FabMenu />
    </PageTemplate>
  );
}
