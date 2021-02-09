import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { App } from './app';
import { createClient } from './apollo/client';
import { theme } from './theme';

const client = createClient();

const Root = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </ThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
