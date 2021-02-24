import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './common/common.css';
import reportWebVitals from './reportWebVitals';
// import Home from './screens/Home/Home';
// import Header from './common/header/Header'
import 'typeface-roboto';
import Controller from './screens/Controller';

ReactDOM.render(
  <React.StrictMode>
    <Controller/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
