import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import AppRouter from '../router/AppRoutert';

const theme = createMuiTheme({
    palette: {
        background : {
          paper: green[300]
        },
        primary: {
            main: green[500],
            contrastText: '#000000'
        },
        secondary: {
            main: purple[500],
            contrastText: '#000000'
        }
    }
});

export const Theming = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
        <AppRouter />
    </ThemeProvider>
  );
};
