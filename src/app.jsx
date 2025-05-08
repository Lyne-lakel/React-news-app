import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import Profile from './pages/Profile';
import ThemeToggle from './components/ThemeToggle';
import { NewsContext } from './context/NewsContext';
import './styles/App.css';

function App() {
  const { theme } = useContext(NewsContext);

  return (
    <Router>
      <div className={`app ${theme}`}>
        <header className="header">
          <h1 className="logo">News App</h1>
          <nav className="nav">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
            <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Profile</NavLink>
            <ThemeToggle />
          </nav>
        </header>
        <main className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;