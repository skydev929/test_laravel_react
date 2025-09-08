/**
 * Main Application Component
 * 
 * Root component that renders the domain lookup interface
 * with a clean, responsive layout using Tailwind CSS.
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App bg-gray-100 min-h-screen p-6">
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
