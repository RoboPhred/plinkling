import * as React from "react";

import ThemeProvider from "@/theme/components/ThemeProvider";
import StoreProvider from "@/store/components/StoreProvider";

import Game from "@/components/Game";

const Root: React.FC = () => (
  <ThemeProvider>
    <StoreProvider>
      <Game />
    </StoreProvider>
  </ThemeProvider>
);

export default Root;
