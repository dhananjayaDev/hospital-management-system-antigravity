import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/admin/Doctors';
import Appointments from './pages/Appointments';
import Layout from './components/Layout';
import PatientList from './pages/receptionist/PatientList';
import StaffPatientRegister from './pages/receptionist/PatientRegister';
import StaffBookAppointment from './pages/receptionist/BookAppointment';

// Role based protection
const RoleRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (!roles.includes(user.role)) return <Navigate to="/" />;
  return <Layout>{children}</Layout>;
};

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin/doctors" element={
            <RoleRoute roles={['ADMIN']}>
              <Doctors />
            </RoleRoute>
          } />

          <Route path="/reception/patients" element={
            <RoleRoute roles={['ADMIN', 'DOCTOR', 'RECEPTIONIST']}>
              <PatientList />
            </RoleRoute>
          } />

          <Route path="/reception/register-patient" element={
            <RoleRoute roles={['ADMIN', 'RECEPTIONIST']}>
              <StaffPatientRegister />
            </RoleRoute>
          } />

          <Route path="/reception/book-appointment/:patientId" element={
            <RoleRoute roles={['ADMIN', 'RECEPTIONIST']}>
              <StaffBookAppointment />
            </RoleRoute>
          } />

          <Route path="/appointments" element={
            <PrivateRoute>
              <Appointments />
            </PrivateRoute>
          } />

          <Route path="/" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
