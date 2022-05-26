import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ContactProvider from './context/contactProvider/contactProvider';
import { BrowserRouter } from 'react-router-dom';
import AlertProvider from './context/AlertProvider/AlertProvider';
import OptionProvider from './context/OptionProvider/OptionProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <OptionProvider>
        <AlertProvider>
          <ContactProvider>
            <App />
          </ContactProvider>
        </AlertProvider>
      </OptionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
