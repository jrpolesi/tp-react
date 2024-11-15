import { PropsWithChildren } from "react";
import { Box } from "./MuiWrap";

type PageTemplateProps = PropsWithChildren<{}>;

export function PageTemplate({ children }: PageTemplateProps) {
  return <Box>{children}</Box>;
}
