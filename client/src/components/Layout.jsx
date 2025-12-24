import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
    const { user } = useAuth();

    // If not logged in, just show content (likely login/register pages which handle their own layout centered)
    if (!user) {
        return <>{children}</>;
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <main style={{
                flex: 1,
                marginLeft: '280px', // Width of sidebar
                padding: '32px 48px',
                backgroundColor: 'var(--md-sys-color-surface-container)'
            }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
