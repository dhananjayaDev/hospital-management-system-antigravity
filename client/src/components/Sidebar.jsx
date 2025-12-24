import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const NavItem = ({ to, icon, label }) => (
        <Link to={to} style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            borderRadius: 'var(--md-sys-shape-corner-full)',
            textDecoration: 'none',
            marginBottom: '8px',
            backgroundColor: isActive(to) ? 'var(--md-sys-color-primary-container)' : 'transparent',
            color: isActive(to) ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)',
            fontWeight: isActive(to) ? '600' : '500',
        }}>
            <span className="material-symbols-outlined" style={{ marginRight: '12px' }}>{icon}</span>
            {label}
        </Link>
    );

    return (
        <div style={{
            width: '280px',
            height: '100vh',
            backgroundColor: 'var(--md-sys-color-surface)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            left: 0,
            top: 0,
            borderRight: '1px solid #e0e2e0',
            zIndex: 100
        }}>
            <div style={{ marginBottom: '40px', paddingLeft: '16px' }}>
                <h2 style={{ color: 'var(--md-sys-color-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>local_hospital</span>
                    HMS
                </h2>
            </div>

            <div style={{ flex: 1 }}>
                <NavItem to="/" icon="dashboard" label="Dashboard" />
                <NavItem to="/appointments" icon="calendar_month" label="Appointments" />

                {user?.role === 'ADMIN' && (
                    <NavItem to="/admin/doctors" icon="stethoscope" label="Doctors" />
                )}
            </div>

            <div style={{ borderTop: '1px solid #e0e2e0', paddingTop: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', paddingLeft: '8px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--md-sys-color-primary-container)',
                        color: 'var(--md-sys-color-on-primary-container)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                    }}>
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div style={{ fontWeight: '500', fontSize: '14px' }}>{user?.name}</div>
                        <div style={{ fontSize: '12px', color: '#444746' }}>{user?.role}</div>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="btn"
                    style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--md-sys-color-error)' }}
                >
                    <span className="material-symbols-outlined">logout</span>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
