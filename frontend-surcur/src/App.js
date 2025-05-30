/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Bienvenida from './pages/Bienvenida';
import CrearCurso from './pages/CrearCurso';
import DetalleCurso from './pages/DetalleCurso';
import CursoCompleto from './pages/CursoCompleto'; // pantalla que muestra el curso completo

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/bienvenida" element={<Bienvenida />} />
        <Route path="/crear-curso" element={<CrearCurso />} />
        <Route path="/curso/:id" element={<DetalleCurso />} />
        <Route path="/curso-completo/:id" element={<CursoCompleto />} />
      </Routes>
    </Router>
  );
}

export default App;
