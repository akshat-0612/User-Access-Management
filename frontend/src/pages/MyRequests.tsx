import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const MyRequests: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [requests, setRequests] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      axios.get('/api/requests/my', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setRequests(res.data))
      .catch(err => setError(err.response?.data?.message || 'Error fetching requests'));
    }
  }, [token]);

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: 800 }}>
        <h2 className="mb-4 text-center">My Requests</h2>
        {error && <div className="alert alert-danger text-center mb-3">{error}</div>}
        {requests.length === 0 && <div className="text-center text-muted">No requests found.</div>}
        <div className="d-flex flex-column gap-3">
          {requests.map(req => (
            <div key={req.id} className="border rounded p-3 bg-light d-flex align-items-center justify-content-between">
              <div>
                <div className="fw-bold fs-5 mb-1">{req.software.name}</div>
                <div className="text-secondary mb-1">Access: <b>{req.accessType}</b></div>
                <div className="mb-1"><span className="text-secondary">Reason:</span> {req.reason}</div>
                <span className={`badge bg-${req.status === 'Approved' ? 'success' : req.status === 'Rejected' ? 'danger' : 'warning'} text-dark me-2`}>{req.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyRequests; 