import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: 'var(--md-sys-color-surface-container)'
        }}>
            <div className="card" style={{ width: '450px', padding: '48px 40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--md-sys-color-primary)' }}>local_hospital</span>
                    <h1 style={{ fontSize: '24px', marginTop: '16px' }}>Sign in</h1>
                    <p style={{ marginTop: '8px' }}>to continue to HMS</p>
                </div>

                {error && <div style={{ color: 'var(--md-sys-color-error)', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            className="input-field"
                            type="email"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label className="input-label">Email</label>
                    </div>

                    <div className="input-group">
                        <input
                            className="input-field"
                            type="password"
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label className="input-label">Password</label>
                    </div>

                    <div style={{ marginBottom: '32px', textAlign: 'right' }}>
                        <a href="#" style={{ color: 'var(--md-sys-color-primary)', fontSize: '14px', fontWeight: '500' }}>Forgot password?</a>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                        <Link to="/register" style={{ color: 'var(--md-sys-color-primary)', fontWeight: '500', marginRight: 'auto' }}>Create account</Link>
                        <button type="submit" className="btn btn-primary" style={{}}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
