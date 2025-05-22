import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const accessOptions = ['Read', 'Write', 'Admin'];

const CreateSoftware: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [accessLevels, setAccessLevels] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const { token } = useContext(AuthContext);

  const handleCheckbox = (level: string) => {
    setAccessLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post('/api/software', { name, description, accessLevels }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Software created!');
      setName('');
      setDescription('');
      setAccessLevels([]);
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error creating software');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: 500, width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-center">Create Software</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Access Levels:</label>
            <div className="d-flex gap-3">
              {accessOptions.map(level => (
                <div className="form-check" key={level}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={accessLevels.includes(level)}
                    onChange={() => handleCheckbox(level)}
                    id={`access-${level}`}
                  />
                  <label className="form-check-label" htmlFor={`access-${level}`}>{level}</label>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="btn btn-success w-100">Create</button>
          {message && <div className={`alert mt-3 text-center ${message.includes('created') ? 'alert-success' : 'alert-danger'}`} role="alert">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default CreateSoftware; 