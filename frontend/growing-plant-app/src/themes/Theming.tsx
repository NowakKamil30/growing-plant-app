import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { AppLayout } from '../layouts/AppLayout';
import { green, purple } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[400]
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