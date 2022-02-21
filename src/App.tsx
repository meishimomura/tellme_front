import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useSelector } from "react-redux";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Auth from "features/auth/Auth";
import Home from "features/home/Home";
import Comment from "features/comment/Comment";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3da9fc",
    },
    default: {
      main: grey.A400,
    },
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "initial",
        },
      },
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
            <Switch>
              <Route path="/signin" component={Auth} />
              <Route path="/home" component={Home} />
              <Route path="/comment/:commentId" component={Comment} />
              <Route component={Auth} />
            </Switch>
          </div>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
};

export default App;
