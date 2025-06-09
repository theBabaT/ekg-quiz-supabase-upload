import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QuestionProvider } from './context/QuestionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QuestionProvider>
    <App />
  </QuestionProvider>
);
