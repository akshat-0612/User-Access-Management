import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const accessOptions = ['Read', 'Write', 'Admin'];

const RequestAccess: React.FC = () => {
  const [softwareList, setSoftwareList] = useState<any[]>([]);
  const [software, setSoftware] = useState('');
  const [accessType, setAccessType] = useState('Read');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    axios.get('/api/software').then(res => setSoftwareList(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post('/api/requests', { softwareId: software, accessType, reason }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Request submitted!');
      setSoftware('');
      setAccessType('Read');
      setReason('');
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error submitting request');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: 500, width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <h2 className="mb-3 text-center">Request Software Access</h2>
          <div className="mb-3 text-muted text-center" style={{ fontSize: '1.05em' }}>
            Fill out the form below to request access to a software. Your manager will review your request.
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Software</label>
            <select className="form-select" value={software} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSoftware(e.target.value)} required>
              <option value="">Select Software</option>
              {softwareList.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Access Type</label>
            <select className="form-select" value={accessType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAccessType(e.target.value)} required>
              {accessOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Reason</label>
            <textarea
              className="form-control"
              placeholder="Reason"
              value={reason}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)}
              required
              style={{ minHeight: 60 }}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-2">Submit Request</button>
          {message && <div className={`alert mt-3 text-center ${message.includes('submitted') ? 'alert-success' : 'alert-danger'}`} role="alert">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default RequestAccess; 