import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import WorkspaceLogin from './components/Workspace-and-login-page/WorkspaceLogin';

 


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WorkspaceLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
