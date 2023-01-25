import React, { Fragment, useEffect } from 'react';
import '../styles/index.css';
import { StylesProvider, createGenerateClassName } from '@mui/styles';
import ClientOnly from '../components/ClientOnly';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from 'next-themes';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider as ReduxProvider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import store from '../components/store/store';
import Collapse from '@mui/material/Collapse';
import { SnackbarUtilsConfigurator } from '../utils/notistick/Snackbar';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";


const httpLink = createUploadLink({
  uri: "http://localhost:5000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token,
      
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
});

function MyApp({ Component, pageProps }) {

// this mess created for solving mui server side issue


  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <Fragment>
      <ReduxProvider store={store}>
        <StyledEngineProvider injectFirst>
          <ClientOnly>
            <ThemeProvider enableSystem={true} attribute='class'>
              <CssBaseline />

              <StylesProvider generateClassName={generateClassName}>
                <SnackbarProvider
                  maxSnack={3}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  TransitionComponent={Collapse}
                >
                  <SnackbarUtilsConfigurator />  <ApolloProvider client={client}><Component {...pageProps} />
              </ApolloProvider>   </SnackbarProvider>
              </StylesProvider>
            </ThemeProvider>
          </ClientOnly>
        </StyledEngineProvider>
      </ReduxProvider>
    </Fragment>
  );
}

export default MyApp;
