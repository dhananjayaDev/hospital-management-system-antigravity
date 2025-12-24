import { useState, useEffect } from 'react';
import api from '../../api';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newDoctor, setNewDoctor] = useState({
        name: '', email: '', password: '', specialization: '', availability: ''
    });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let schedule = {};
            try {
                schedule = JSON.parse(newDoctor.availability);
            } catch (e) {
                schedule = { "General": newDoctor.availability };
            }

            await api.post('/doctors', {
                ...newDoctor,
                availability_schedule: schedule
            });
            setShowForm(false);
            setNewDoctor({ name: '', email: '', password: '', specialization: '', availability: '' });
            fetchDoctors();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add doctor');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1>Manage Doctors</h1>
                    <p>Add and view medical staff</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    <span className="material-symbols-outlined">{showForm ? 'close' : 'add'}</span>
                    {showForm ? 'Cancel' : 'Add Doctor'}
                </button>
            </div>

            {showForm && (
                <div className="card" style={{ marginBottom: '32px', maxWidth: '800px' }}>
                    <h3 style={{ marginBottom: '24px' }}>Add New Doctor</h3>
                    {error && <div style={{ color: 'var(--md-sys-color-error)', marginBottom: '16px' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div className="input-group">
                                <input
                                    className="input-field"
                                    value={newDoctor.name}
                                    onChange={e => setNewDoctor({ ...newDoctor, name: e.target.value })}
                                    placeholder=" "
                                    required
                                />
                                <label className="input-label">Full Name</label>
                            </div>

                            <div className="input-group">
                                <input
                                    type="email"
                                    className="input-field"
                                    value={newDoctor.email}
                                    onChange={e => setNewDoctor({ ...newDoctor, email: e.target.value })}
                                    placeholder=" "
                                    required
                                />
                                <label className="input-label">Email</label>
                            </div>

                            <div className="input-group">
                                <input
                                    type="password"
                                    className="input-field"
                                    value={newDoctor.password}
                                    onChange={e => setNewDoctor({ ...newDoctor, password: e.target.value })}
                                    placeholder=" "
                                    required
                                />
                                <label className="input-label">Password</label>
                            </div>

                            <div className="input-group">
                                <input
                                    className="input-field"
                                    value={newDoctor.specialization}
                                    onChange={e => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
                                    placeholder=" "
                                    required
                                />
                                <label className="input-label">Specialization</label>
                            </div>
                        </div>

                        <div className="input-group" style={{ marginTop: '24px' }}>
                            <input
                                className="input-field"
                                value={newDoctor.availability}
                                onChange={e => setNewDoctor({ ...newDoctor, availability: e.target.value })}
                                placeholder=" "
                                required
                            />
                            <label className="input-label">Availability (e.g., "Mon 9-5")</label>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                            <button type="submit" className="btn btn-primary">Create Doctor Profile</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {doctors.map(doc => (
                    <div key={doc.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--md-sys-color-primary-container)',
                                color: 'var(--md-sys-color-on-primary-container)', display: 'flex', justifyContent: 'center', alignItems: 'center',
                                fontWeight: 'bold', fontSize: '20px'
                            }}>
                                {doc.User?.name?.charAt(0)}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '18px' }}>{doc.User?.name || 'Unknown'}</h3>
                                <span style={{
                                    backgroundColor: 'var(--md-sys-color-secondary-container)',
                                    color: 'var(--md-sys-color-on-secondary-container)',
                                    padding: '2px 8px', borderRadius: '4px', fontSize: '12px'
                                }}>
                                    {doc.specialization}
                                </span>
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid #e0e2e0', paddingTop: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#444746', marginBottom: '8px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>email</span>
                                <span style={{ fontSize: '14px' }}>{doc.User?.email}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#444746' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>schedule</span>
                                <span style={{ fontSize: '14px' }}>
                                    {typeof doc.availability_schedule === 'string'
                                        ? doc.availability_schedule
                                        : Object.entries(doc.availability_schedule || {}).map(([k, v]) => `${k}: ${v}`).join(', ')
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Doctors;
