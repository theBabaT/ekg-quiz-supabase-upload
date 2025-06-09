import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import QuizPage from './pages/QuizPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/quiz/:setId" element={<QuizPage />} />
        <Route path="/" element={<h2>Willkommen zum EKG-Quiz</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
