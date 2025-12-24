import { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

const StaffPatientRegister = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', date_of_birth: '', phone: '', address: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/patients/staff-create', formData);
            setSuccess(`Patient registered! Temp password: ${data.tempPassword}`);
            setError('');
            // Optional: redirect after delay or allow registering another
            // setTimeout(() => navigate('/reception/booking/new'), 2000); 
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            setSuccess('');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '24px' }}>Register New Patient</h1>

            <div className="card">
                {error && <div style={{ color: 'var(--md-sys-color-error)', marginBottom: '16px' }}>{error}</div>}
                {success && <div style={{ color: 'var(--md-sys-color-primary)', marginBottom: '16px', fontWeight: 'bold' }}>{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input className="input-field" placeholder=" " value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                        <label className="input-label">Full Name</label>
                    </div>
                    <div className="input-group">
                        <input className="input-field" type="email" placeholder=" " value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                        <label className="input-label">Email</label>
                    </div>
                    <div className="input-group">
                        <input className="input-field" type="date" placeholder=" " value={formData.date_of_birth} onChange={e => setFormData({ ...formData, date_of_birth: e.target.value })} required />
                        <label className="input-label">Date of Birth</label>
                    </div>
                    <div className="input-group">
                        <input className="input-field" placeholder=" " value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
                        <label className="input-label">Phone</label>
                    </div>
                    <div className="input-group">
                        <textarea className="input-field" placeholder=" " rows="3" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })}></textarea>
                        <label className="input-label">Address</label>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '24px' }}>
                        <button type="button" className="btn btn-text" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Register Patient</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StaffPatientRegister;
