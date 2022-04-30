import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';
import BeerDataContextProvider from "./context/BeerDataContext";
import AuthContextProvider from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <AuthContextProvider>
        <BeerDataContextProvider>
            <App />
        </BeerDataContextProvider>
        </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
