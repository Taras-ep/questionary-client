import React from 'react'
import './App.css';
import EditQuiz from './pages/QuizEditorPage.tsx';
import LogInPage from './pages/authPage/LogInPage.tsx';
import SignUpPage from './pages/authPage/SignUpPage.tsx';
import OnSuccessSignUpPage from './pages/authPage/OnSuccessSignUpPage.tsx';
import QuizCatalog from './pages/QuizCatalogPage.tsx';
import MenuBar from './menuBar/MenuBar.tsx';
import { Routes, Route, BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MenuBar />
        <Routes>
          <Route path={'/'} element={<QuizCatalog />} />
          <Route path={'/EditQuiz'} element={<EditQuiz />} />
          <Route path={'/LogInPage'} element={<LogInPage />} />
          <Route path={'/SignUpPage'} element={<SignUpPage />} />
          <Route path={'/SignUpPage/OnSuccessSignUpPage'} element={<OnSuccessSignUpPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

