import React from "react";

//Dark mode
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// end import

//Route
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// End route

//import Container
import Container from "@material-ui/core/Container";
// End import

//Import components
import Navbar from "./components/Navbar";
// End import

//Import Views
import Home from "./Views/Home";
import Series from "./Views/Series";
import Movies from "./Views/Movies";
import Settings from "./Views/Settings";
// End import

function App() {
  //Dark theme
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  // End theme
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Container maxWidth="lg">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/series" component={Series}></Route>
            <Route exact path="/peliculas" component={Movies}></Route>
            <Route exact path="/configuracion" component={Settings}></Route>
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
