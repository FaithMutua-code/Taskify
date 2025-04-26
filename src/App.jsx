import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import WorkspaceLoginForms from './components/Workspace-and-login-page/WorkspaceLoginForms'; 


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WorkspaceLoginForms />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
