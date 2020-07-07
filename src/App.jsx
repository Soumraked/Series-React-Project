import React, { useState } from "react";

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
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
// End import

//Import Views
import Home from "./Views/Home";
import Series from "./Views/Series";
import Movies from "./Views/Movies";
import Settings from "./Views/Settings";
import SerieDetails from "./Views/SerieDetails";
import Chapter from "./Views/Chapter";
import Error from "./Views/Error";
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
  const [themeState, setThemeState] = useState(false);
  const palletType = themeState ? "dark" : "light";
  const theme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });
  const handleThemeChange = () => {
    setThemeState(!themeState);
    localStorage.theme = !themeState ? "dark" : "light";
  };

  React.useEffect(() => {
    const obtenerInfo = () => {
      if (localStorage.theme === "dark") {
        setThemeState(true);
      } else if (localStorage.theme === "light") {
        setThemeState(false);
      } else {
        setThemeState(prefersDarkMode ? true : false);
        localStorage.theme = prefersDarkMode ? "light" : "dark";
      }
    };
    obtenerInfo();
  }, [prefersDarkMode, setThemeState]);

  // End theme
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar
            themeState={themeState}
            handleThemeChange={handleThemeChange}
          />
          <Container maxWidth="lg">
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/series" component={Series}></Route>
              <Route exact path="/peliculas" component={Movies}></Route>
              <Route exact path="/configuracion" component={Settings}></Route>
              <Route exact path="/series/:id" component={SerieDetails}></Route>
              <Route exact path="/series/:id/:num" component={Chapter}></Route>
              <Route component={Error}></Route>
            </Switch>
          </Container>
          <Footer />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
