import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@material-ui/core";

import './index.css';
import reportWebVitals from './reportWebVitals';
import Routes from "./routes";
import theme from "./theme";
import AppContainer from "./components/AppContainer";
import AppProvider from './providers';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppProvider>
          <AppContainer>
            <Routes/>
          </AppContainer>
        </AppProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
