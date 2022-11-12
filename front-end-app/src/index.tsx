import React from 'react';
import 'index.css';
import App from 'App';
import reportWebVitals from 'reportWebVitals';
import { AppProvider } from 'context/appContext';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
