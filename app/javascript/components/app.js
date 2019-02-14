import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import theme from "./utils/theme";
import AppContainer from "./appContainer";

class App extends React.Component {
  render() {
    const getGridListCols = () => {
      if (isWidthUp("xl", this.props.width)) {
        return 5;
      }

      if (isWidthUp("lg", this.props.width)) {
        return 4;
      }

      if (isWidthUp("md", this.props.width)) {
        return 2;
      }

      return 1;
    };
    return (
      <MuiThemeProvider theme={theme}>
        <AppContainer getGridListCols={getGridListCols} />
      </MuiThemeProvider>
    );
  }
}

export default withWidth()(App);
