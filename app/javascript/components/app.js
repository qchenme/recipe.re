import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./utils/theme";
import AppContainer from "./appContainer";

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppContainer />
      </MuiThemeProvider>
    );
  }
}

export default App;
