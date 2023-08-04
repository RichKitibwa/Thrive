import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Home from './components/home';
import TaskDashboard from './components/TaskDashboard';
import "bootstrap/dist/css/bootstrap.min.css"


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<TaskDashboard />} />
      </Routes>
    </Router>
  
  );
}

export default App;
