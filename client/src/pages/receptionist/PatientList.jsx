import { useState, useEffect } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const { data } = await api.get('/patients');
            setPatients(data);
        } catch (error) {
            console.error(error);
        }
    };

    const filteredPatients = patients.filter(p =>
        p.User?.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.phone?.includes(search)
    );

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1>Patient Directory</h1>
                    <p>Search and manage patients</p>
                </div>
                <Link to="/reception/register-patient" className="btn btn-primary">
                    <span className="material-symbols-outlined">person_add</span>
                    Register New Patient
                </Link>
            </div>

            <div className="card" style={{ marginBottom: '24px', padding: '16px' }}>
                <div className="input-group" style={{ marginBottom: 0 }}>
                    <span className="material-symbols-outlined" style={{ position: 'absolute', top: '12px', left: '12px', color: '#64748b' }}>search</span>
                    <input
                        className="input-field"
                        style={{ paddingLeft: '40px' }}
                        placeholder="Search by Name or Phone..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
                {filteredPatients.map(p => (
                    <div key={p.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--md-sys-color-secondary-container)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                            }}>
                                {p.User?.name?.charAt(0)}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '16px' }}>{p.User?.name}</h3>
                                <p style={{ fontSize: '14px', color: 'var(--md-sys-color-secondary)' }}>DOB: {p.date_of_birth} | Phone: {p.phone}</p>
                            </div>
                        </div>
                        <Link to={`/reception/book-appointment/${p.id}`} className="btn btn-text" style={{ color: 'var(--md-sys-color-primary)' }}>
                            Book Appointment
                        </Link>
                    </div>
                ))}
                {filteredPatients.length === 0 && <p style={{ textAlign: 'center', color: 'var(--md-sys-color-secondary)' }}>No patients found.</p>}
            </div>
        </div>
    );
};

export default PatientList;
