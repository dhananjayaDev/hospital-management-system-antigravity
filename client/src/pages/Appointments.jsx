import { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const Appointments = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [showBookForm, setShowBookForm] = useState(false);
    const [booking, setBooking] = useState({ doctor_id: '', appointment_date: '', reason: '' });

    useEffect(() => {
        fetchAppointments();
        if (user.role === 'PATIENT') {
            fetchDoctors();
        }
    }, [user.role]);

    const fetchAppointments = async () => {
        try {
            const { data } = await api.get('/appointments');
            setAppointments(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchDoctors = async () => {
        try {
            const { data } = await api.get('/doctors');
            setDoctors(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleBook = async (e) => {
        e.preventDefault();
        try {
            await api.post('/appointments', booking);
            setShowBookForm(false);
            fetchAppointments();
        } catch (err) {
            console.error('Booking failed');
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/appointments/${id}`, { status });
            fetchAppointments();
        } catch (err) {
            console.error(err);
        }
    };

    const StatusChip = ({ status }) => {
        const colors = {
            PENDING: { bg: '#fff7ed', text: '#c2410c' }, // Orange
            CONFIRMED: { bg: '#ecfccb', text: '#4d7c0f' }, // Lime
            COMPLETED: { bg: '#e0e7ff', text: '#3730a3' }, // Indigo
            CANCELLED: { bg: '#fef2f2', text: '#b91c1c' }, // Red
        };
        const style = colors[status] || colors.PENDING;
        return (
            <span style={{
                backgroundColor: style.bg,
                color: style.text,
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: '600',
                display: 'inline-block'
            }}>
                {status}
            </span>
        );
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1>Appointments</h1>
                    <p>Manage your schedule and bookings</p>
                </div>

                {user.role === 'PATIENT' && (
                    <button className="btn btn-primary" onClick={() => setShowBookForm(!showBookForm)}>
                        <span className="material-symbols-outlined">{showBookForm ? 'close' : 'add'}</span>
                        {showBookForm ? 'Cancel' : 'Book New'}
                    </button>
                )}
            </div>

            {showBookForm && (
                <div className="card" style={{ marginBottom: '32px', maxWidth: '600px' }}>
                    <h3 style={{ marginBottom: '16px' }}>Book Appointment</h3>
                    <form onSubmit={handleBook}>
                        <div className="input-group">
                            <select
                                className="input-field"
                                value={booking.doctor_id}
                                onChange={e => setBooking({ ...booking, doctor_id: e.target.value })}
                                required
                            >
                                <option value="">Select Doctor</option>
                                {doctors.map(d => (
                                    <option key={d.id} value={d.id}>{d.User.name} - {d.specialization}</option>
                                ))}
                            </select>
                            <label className="input-label" style={{ backgroundColor: 'transparent' }}>Doctor</label>
                        </div>

                        <div className="input-group">
                            <input
                                type="datetime-local"
                                className="input-field"
                                value={booking.appointment_date}
                                onChange={e => setBooking({ ...booking, appointment_date: e.target.value })}
                                required
                            />
                            <label className="input-label">Date & Time</label>
                        </div>

                        <div className="input-group">
                            <input
                                type="text"
                                className="input-field"
                                placeholder=" "
                                value={booking.reason}
                                onChange={e => setBooking({ ...booking, reason: e.target.value })}
                            />
                            <label className="input-label">Reason for Visit</label>
                        </div>

                        <button type="submit" className="btn btn-primary">Confirm Booking</button>
                    </form>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {appointments.map(appt => (
                    <div key={appt.id} className="card" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '24px'
                    }}>
                        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                            <div style={{
                                width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#f1f5f9',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'
                            }}>
                                <span className="material-symbols-outlined">event</span>
                            </div>
                            <div>
                                <h3 style={{ marginBottom: '4px' }}>{new Date(appt.appointment_date).toLocaleString()}</h3>
                                <p style={{ color: 'var(--md-sys-color-secondary)' }}>
                                    {user.role === 'DOCTOR' ? `Patient: ${appt.Patient?.User?.name}` : `Doctor: ${appt.Doctor?.User?.name}`}
                                </p>
                                <p style={{ fontSize: '14px', marginTop: '4px' }}>{appt.reason}</p>
                            </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <div style={{ marginBottom: '8px' }}><StatusChip status={appt.status} /></div>

                            <div style={{ display: 'flex', gap: '8px' }}>
                                {['DOCTOR', 'ADMIN', 'RECEPTIONIST'].includes(user.role) && appt.status === 'PENDING' && (
                                    <>
                                        <button className="btn btn-text" style={{ color: 'var(--md-sys-color-primary)' }} onClick={() => updateStatus(appt.id, 'CONFIRMED')}>Confirm</button>
                                        <button className="btn btn-text" style={{ color: 'var(--md-sys-color-error)' }} onClick={() => updateStatus(appt.id, 'CANCELLED')}>Cancel</button>
                                    </>
                                )}
                                {['DOCTOR', 'ADMIN', 'RECEPTIONIST'].includes(user.role) && appt.status === 'CONFIRMED' && (
                                    <button className="btn btn-primary" onClick={() => updateStatus(appt.id, 'COMPLETED')}>Complete</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {appointments.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '48px', color: 'var(--md-sys-color-secondary)' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '48px', marginBottom: '16px' }}>calendar_today</span>
                        <p>No appointments found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Appointments;
