import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();

    const SummaryCard = ({ title, value, icon, to, color = 'primary' }) => (
        <Link to={to} className="card" style={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            cursor: to ? 'pointer' : 'default',
            transition: 'transform 0.2s, box-shadow 0.2s'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{
                    padding: '12px',
                    borderRadius: '16px',
                    backgroundColor: `var(--md-sys-color-${color}-container)`,
                    color: `var(--md-sys-color-on-${color}-container)`
                }}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
            </div>
            <div>
                <h3 style={{ fontSize: '32px', marginBottom: '4px' }}>{value}</h3>
                <p style={{ color: 'var(--md-sys-color-secondary)' }}>{title}</p>
            </div>
        </Link>
    );

    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ marginBottom: '8px' }}>Hello, {user?.name}</h1>
                <p style={{ fontSize: '16px' }}>Here's what's happening today.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <div className="card" style={{ gridColumn: '1 / -1', background: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)', color: 'white' }}>
                    <h2 style={{ color: 'white' }}>Welcome to HMS</h2>
                    <p style={{ color: '#e0e7ff', marginTop: '8px', maxWidth: '600px' }}>
                        Manage your hospital operations efficiently. access appointments, doctors, and patient records from this unified dashboard.
                    </p>
                </div>

                <SummaryCard
                    title="Appointments"
                    value="View"
                    icon="calendar_month"
                    to="/appointments"
                />

                {user?.role === 'ADMIN' && (
                    <SummaryCard
                        title="Doctors"
                        value="Manage"
                        icon="stethoscope"
                        to="/admin/doctors"
                        color="secondary"
                    />
                )}

                <div className="card">
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{
                            width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e0e7ff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 'bold', fontSize: '20px', color: '#3730a3'
                        }}>
                            {user?.name?.charAt(0)}
                        </div>
                        <div>
                            <h3>My Profile</h3>
                            <p>{user?.role}</p>
                            <small style={{ color: 'var(--md-sys-color-secondary)' }}>{user?.email}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
