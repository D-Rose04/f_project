import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/style.css';
import App from './App';
import { LoginProvider } from './firebase/context/LoginContext';
import { LoadingProvider } from './firebase/context/LoadingContext';
import UserProvider from './firebase/context/UserProvider';

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <React.StrictMode>
    <LoadingProvider>
      <LoginProvider>
        <UserProvider>  
          <App />
        </UserProvider>
      </LoginProvider>
    </LoadingProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
