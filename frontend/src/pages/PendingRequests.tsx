import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

interface Request {
  id: number;
  user: { username: string };
  software: { name: string };
  accessType: string;
  reason: string;
  status: string;
}

const statusOptions = ['Pending', 'Approved', 'Rejected'] as const;

type StatusFilter = typeof statusOptions[number];

const PendingRequests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [message, setMessage] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('Pending');
  const { token } = useContext(AuthContext);

  const fetchRequests = () => {
    axios.get(`/api/requests?status=${statusFilter}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => setRequests(res.data));
  };

  useEffect(() => {
    if (token) fetchRequests();
    // eslint-disable-next-line
  }, [token, statusFilter]);

  const handleAction = async (id: number, status: 'Approved' | 'Rejected') => {
    setMessage('');
    try {
      await axios.patch(`/api/requests/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage(`Request ${status.toLowerCase()}!`);
      fetchRequests();
    } catch (err: any) {
      setMessage('Error updating request');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: 800 }}>
        <h2 className="mb-4 text-center">{statusFilter} Requests</h2>
        <div className="mb-3 text-center">
          {statusOptions.map(opt => (
            <button
              key={opt}
              onClick={() => setStatusFilter(opt)}
              className={`btn btn-outline-primary btn-sm mx-1 ${statusFilter === opt ? 'active' : ''}`}
              style={{ fontWeight: statusFilter === opt ? 'bold' : 'normal' }}
              type="button"
            >
              {opt}
            </button>
          ))}
        </div>
        {requests.length === 0 && <div className="text-center text-muted">No {statusFilter.toLowerCase()} requests.</div>}
        <div className="d-flex flex-column gap-3">
          {requests.map(req => (
            <div key={req.id} className="border rounded p-3 bg-light d-flex align-items-center justify-content-between">
              <div>
                <div className="fw-bold fs-5 mb-1">{req.software.name}</div>
                <div className="text-secondary mb-1">User: <b>{req.user.username}</b></div>
                <div className="text-secondary mb-1">Access: <b>{req.accessType}</b></div>
                <div className="mb-1"><span className="text-secondary">Reason:</span> {req.reason}</div>
                <span className={`badge bg-${req.status === 'Approved' ? 'success' : req.status === 'Rejected' ? 'danger' : 'warning'} text-dark me-2`}>{req.status}</span>
              </div>
              {statusFilter === 'Pending' && (
                <div>
                  <button onClick={() => handleAction(req.id, 'Approved')} className="btn btn-success btn-sm me-2" type="button">Approve</button>
                  <button onClick={() => handleAction(req.id, 'Rejected')} className="btn btn-danger btn-sm" type="button">Reject</button>
                </div>
              )}
            </div>
          ))}
        </div>
        {message && <div className={`alert mt-3 text-center ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`} role="alert">{message}</div>}
      </div>
    </div>
  );
};

export default PendingRequests; 