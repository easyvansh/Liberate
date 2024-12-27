import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const customTheme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#ecfeff",
      100: "#cffafe",
      500: "#06b6d4",
    },
    accent: {
      500: "#DDA15E",
    },
  },
  fonts: {
    heading: "'Nunito', sans-serif",
    body: "'Nunito', sans-serif",
  },
});

export default customTheme;
