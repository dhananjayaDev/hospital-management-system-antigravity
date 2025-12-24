import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        date_of_birth: '',
        phone: '',
        address: '',
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ ...formData, role: 'PATIENT' });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: 'var(--md-sys-color-surface-container)',
            padding: '40px 0'
        }}>
            <div className="card" style={{ width: '500px', padding: '40px' }}>
                <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Create Account</h2>
                {error && <div style={{ color: 'var(--md-sys-color-error)', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            className="input-field"
                            type="text"
                            name="name"
                            placeholder=" "
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <label className="input-label">Full Name</label>
                    </div>

                    <div className="input-group">
                        <input
                            className="input-field"
                            type="email"
                            name="email"
                            placeholder=" "
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <label className="input-label">Email</label>
                    </div>

                    <div className="input-group">
                        <input
                            className="input-field"
                            type="password"
                            name="password"
                            placeholder=" "
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <label className="input-label">Password</label>
                    </div>

                    <div className="input-group">
                        <input
                            className="input-field"
                            type="date"
                            name="date_of_birth"
                            placeholder=" "
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            required
                        />
                        <label className="input-label">Date of Birth</label>
                    </div>

                    <div className="input-group">
                        <input
                            className="input-field"
                            type="text"
                            name="phone"
                            placeholder=" "
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        <label className="input-label">Phone</label>
                    </div>

                    <div className="input-group">
                        <textarea
                            className="input-field"
                            name="address"
                            placeholder=" "
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                        ></textarea>
                        <label className="input-label">Address</label>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '24px' }}>
                        <Link to="/login" className="btn btn-text">Cancel</Link>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
