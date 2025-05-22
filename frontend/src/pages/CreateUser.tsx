import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const CreateUser: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee');
  const [message, setMessage] = useState('');
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post('/api/auth/create-user', { username, password, role }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage(`${role} created!`);
      setUsername('');
      setPassword('');
      setRole('Employee');
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error creating user');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: 450, width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-center">Create User <span className="badge bg-secondary">Admin Only</span></h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <select className="form-select" value={role} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)}>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Create</button>
          {message && <div className={`alert mt-3 text-center ${message.includes('created') ? 'alert-success' : 'alert-danger'}`} role="alert">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default CreateUser; 