import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateSoftware from './pages/CreateSoftware';
import RequestAccess from './pages/RequestAccess';
import PendingRequests from './pages/PendingRequests';
import CreateUser from './pages/CreateUser';
import MyRequests from './pages/MyRequests';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const NavBar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">UAM</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user ? (
              <>
                {user.role === 'Admin' && <li className="nav-item"><NavLink to="/create-software" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Create Software</NavLink></li>}
                {user.role === 'Admin' && <li className="nav-item"><NavLink to="/create-user" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Create User</NavLink></li>}
                {user.role === 'Employee' && <li className="nav-item"><NavLink to="/request-access" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Request Access</NavLink></li>}
                {user.role === 'Employee' && <li className="nav-item"><NavLink to="/my-requests" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>My Requests</NavLink></li>}
                {user.role === 'Manager' && <li className="nav-item"><NavLink to="/pending-requests" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Pending Requests</NavLink></li>}
              </>
            ) : (
              <>
                <li className="nav-item"><NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Login</NavLink></li>
                <li className="nav-item"><NavLink to="/signup" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Sign Up</NavLink></li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user && (
              <>
                <li className="nav-item">
                  <span className="navbar-text me-2">{user.username} <span className="text-secondary">({user.role})</span></span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger btn-sm" onClick={logout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <main className="main">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-software" element={<PrivateRoute roles={["Admin"]}><CreateSoftware /></PrivateRoute>} />
            <Route path="/create-user" element={<PrivateRoute roles={["Admin"]}><CreateUser /></PrivateRoute>} />
            <Route path="/request-access" element={<PrivateRoute roles={["Employee"]}><RequestAccess /></PrivateRoute>} />
            <Route path="/my-requests" element={<PrivateRoute roles={["Employee"]}><MyRequests /></PrivateRoute>} />
            <Route path="/pending-requests" element={<PrivateRoute roles={["Manager"]}><PendingRequests /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
        <footer className="footer">
          &copy; {new Date().getFullYear()} UAM — All rights reserved.
        </footer>
      </Router>
    </AuthProvider>
  );
};

export default App;
