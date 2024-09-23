import "@styles/app.scss";

// Third-party imports
import axios from "axios";
import { type FC, useEffect, useState } from "react";
import { HashRouter as Router } from "react-router-dom";
import { Typography } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { SnackbarProvider } from "notistack";
import { ProvideAuth } from "@timmons-group/shared-react-auth";
// import { getConfigBuilder } from "@timmons-group/shared-auth-config";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import AppRoutes from "./AppRoutes";
import theme from "./muiTheme";
import { BASE_TITLE } from "@constants";
import ScrollToTop from "@components/ScrollToTop";

//Detect if we are not running on localhost
// If so we need to change our subdomain to be api-gap.rest.of.the.domain
// This is because the api is hosted on a subdomain of the main site

const isLocalhost = window.location.hostname === "localhost";
if (!isLocalhost) {
  const domainparts = window.location.hostname.split(".");
  domainparts[0] = "app";

  axios.defaults.baseURL =
    window.location.protocol + "//" + domainparts.join(".");
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App:FC = () => {
  const [initialized, setInitialized] = useState(false);
  const [config, setConfig] = useState<any>(null);

  // fetch a config with useEffect
  useEffect(() => {
    if (!initialized) {
      setConfig({ error: "Config not found" });
      setInitialized(true);
      // Uncomment this block to fetch the config from the server
      // axios
      //   .get(`/api/oauth/config`)
      //   .then((res) => {
      //     const cfg = getConfigBuilder()
      //       .withRawConfiguration(res.data)
      //       .withAppAuthorization("SomeAppName")
      //       .build();
      //     setConfig(cfg);
      //     setInitialized(true);
      //   })
      //   .catch((_err) => {
      //     setConfig({ error: "Config not found" });
      //     setInitialized(true);
      //   });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (config) {
    // TODO: Show error message if config.error is set
    // Add context Auth provider to the App
    return (
      <>
        {/*
          // @ts-ignore */}
        <ProvideAuth config={config} state={{ redirect: "/lcwpp/" }}>
          <ThemeAndRoutes />
        </ProvideAuth>
      </>
    );
  } else {
    // Let's show a decent looking loading message
    return (
      <div className="fullscreen-background">
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <Typography
          variant="h1"
          sx={{ fontSize: "34px", textAlign: "center", color: "#ffffff" }}
        >
          Loading...
          <br />
          {BASE_TITLE}
        </Typography>
      </div>
    );
  }
}

const ThemeAndRoutes: FC = () => {
  return (
    // MUI Theme Provider
    <ThemeProvider theme={theme}>
      {/* CssBaseline global cssReset or css normalize functionality */}
      <CssBaseline />
      {/* MUI Localization Provider needed for any MUI date picker fields */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {/* React DOM Router */}
        <Router>
          <ScrollToTop />
          {/* Notistack Snackbar Provider */}
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            {/* Our actual application */}
            <QueryClientProvider client={queryClient}>
              <AppRoutes />
            </QueryClientProvider>
          </SnackbarProvider>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
