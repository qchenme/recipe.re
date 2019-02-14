import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./components/utils/theme";
import Header from "./components/header";

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Header />
      </MuiThemeProvider>
    );
  }
}

export default App;
