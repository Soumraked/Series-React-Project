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

// Store
import { Provider } from "react-redux";
import generateStore from "./redux/store";
// End import

function App() {
  //Store
  const store = generateStore();
  // End

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
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
