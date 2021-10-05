import { createTheme, ThemeProvider } from '@material-ui/core';
import { StylesProvider } from '@material-ui/styles';
import { ThemeProvider as MuiProvider } from '@material-ui/core';
import { persistor, store } from 'state/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ptBR } from '@material-ui/core/locale';
import Routes from 'routes';
import theme from 'styles/theme';
import GlobalStyle from 'styles/global';
import './App.css';


const muiTheme = createTheme({
  palette: {
    primary: { main: theme.colors.primary },
    secondary: { main: theme.colors.secondary },
    error: { main: theme.colors.error },
  },
  typography: {
    fontFamily: theme.fonts.primary,
    button: {
      fontSize: 16
    }
  }
}, ptBR);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={muiTheme}>
          <ThemeProvider theme={theme}>
            <StylesProvider injectFirst>
              <MuiProvider theme={muiTheme}>
                <GlobalStyle />
                <Routes />
              </MuiProvider>
            </StylesProvider>
          </ThemeProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;