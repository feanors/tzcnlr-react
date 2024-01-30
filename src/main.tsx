import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { AppLayout } from "./AppLayout.tsx";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { trTR } from "@mui/x-date-pickers";
import App from "./App.tsx";

const theme = createTheme(
  {
    components: {
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(5px)",
          },
        },
      },
    },
    palette: {},
  },

  trTR,
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <AppLayout>
        <CssBaseline />
        <App />
      </AppLayout>
    </ThemeProvider>
  </BrowserRouter>,
);
