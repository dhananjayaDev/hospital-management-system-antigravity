import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';

const StaffBookAppointment = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState({ doctor_id: '', appointment_date: '', reason: '' });
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDoctors();
    }, []);

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
            await api.post('/appointments', {
                ...booking,
                patient_id: patientId
            });
            navigate('/appointments'); // Or back to patient list
        } catch (err) {
            setError('Booking failed');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '24px' }}>Book Appointment for Patient #{patientId}</h1>

            <div className="card">
                {error && <div style={{ color: 'var(--md-sys-color-error)', marginBottom: '16px' }}>{error}</div>}

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
                        <label className="input-label">Reason</label>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '24px' }}>
                        <button type="button" className="btn btn-text" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Confirm Booking</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StaffBookAppointment;
