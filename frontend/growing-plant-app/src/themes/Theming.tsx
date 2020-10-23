import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { AppLayout } from '../layouts/AppLayout';
import { green, purple } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        background : {
          paper: green[300]
        },
        primary: {
            main: green[500]
        },
        secondary: {
            main: purple[500]
        }
    }
});

export const Theming = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <AppLayout />
    </ThemeProvider>
  );
};
