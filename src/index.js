import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Routes from "./routes";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@material-ui/core";
import theme from "./theme";
import {store} from "./redux";
import {Provider} from "react-redux";
import SchemasProvider from "./providers/schemas";
import AppContainer from "./components/AppContainer";
import UserProvider from "./providers/user";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <UserProvider>
            <SchemasProvider>
              <AppContainer>
                <Routes/>
              </AppContainer>
            </SchemasProvider>
          </UserProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
