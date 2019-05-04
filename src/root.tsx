import * as React from "react";

import ThemeProvider from "@/theme/components/ThemeProvider";
import StoreProvider from "@/store/components/StoreProvider";

import Boing from "@/components/Boing";

const Root: React.FC = () => (
  <ThemeProvider>
    <StoreProvider>
      <Boing />
    </StoreProvider>
  </ThemeProvider>
);

export default Root;
