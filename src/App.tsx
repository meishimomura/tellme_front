import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useSelector } from "react-redux";

import { Route, BrowserRouter, Redirect } from "react-router-dom";

import Auth from "features/auth/Auth";
import Home from "features/home/Home";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0679EB",
    },
    default: {
      main: grey.A400,
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    default: Palette["primary"];
  }
  interface PaletteOptions {
    default: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    default: true;
  }
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <div>
            <Route exact path="/signin" component={Auth} />
            <Route exact path="/home" component={Home} />
          </div>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
};

export default App;
