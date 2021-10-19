import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from "react-router-dom";
import {App} from "./app/App";
import {Provider} from "react-redux";
import store from "./bll/store";

ReactDOM.render(
  <React.StrictMode>
      <HashRouter>
          <Provider store={store}>
              <App/>
          </Provider>
      </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
