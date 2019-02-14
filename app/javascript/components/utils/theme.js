import { createMuiTheme } from "@material-ui/core/styles";
// Custom theme for the app
const palette = {
  primary: {
    main: "#DB8E71",
    contrastText: "#ffffff"
  },
  secondary: {
    main: "#ED784A",
    contrastText: "#ffffff"
  },
  typography: {
    useNextVariants: true
  }
};
const themeName = "Burning Sand Burnt Sienna Icefish";

export default createMuiTheme({ palette, themeName });
