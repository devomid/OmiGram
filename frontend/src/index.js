import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import { FriendsContextProvider } from './contexts/FriendsContext';
import GeneralProvider from './contexts/GeneralContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FriendsContextProvider>
        <GeneralProvider>
          <App />
        </GeneralProvider>
      </FriendsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);