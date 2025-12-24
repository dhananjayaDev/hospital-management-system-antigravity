const { Appointment, Doctor, Patient, User } = require('../models');

const getAppointments = async (req, res) => {
    try {
        const { role, id } = req.user;
        let where = {};

        // Filter based on role
        if (role === 'PATIENT') {
            // Find patient record for this user
            const patient = await Patient.findOne({ where: { user_id: id } });
            if (!patient) return res.json([]);
            where = { patient_id: patient.id };
        } else if (role === 'DOCTOR') {
            const doctor = await Doctor.findOne({ where: { user_id: id } });
            if (!doctor) return res.json([]);
            where = { doctor_id: doctor.id };
        }
        // Admin/Receptionist see all

        const appointments = await Appointment.findAll({
            where,
            include: [
                {
                    model: Doctor,
                    include: { model: User, attributes: ['name'] }
                },
                {
                    model: Patient,
                    include: { model: User, attributes: ['name'] }
                }
            ],
            order: [['appointment_date', 'ASC']]
        });

        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const bookAppointment = async (req, res) => {
    try {
        const { doctor_id, appointment_date, reason, patient_id } = req.body;
        const { id, role } = req.user;

        let targetPatientId;

        if (role === 'PATIENT') {
            const patient = await Patient.findOne({ where: { user_id: id } });
            if (!patient) return res.status(404).json({ message: 'Patient profile not found' });
            targetPatientId = patient.id;
        } else if (['RECEPTIONIST', 'ADMIN'].includes(role)) {
            // Staff booking for a patient
            if (!patient_id) return res.status(400).json({ message: 'Patient ID is required for staff booking' });
            targetPatientId = patient_id;
        } else {
            return res.status(403).json({ message: 'Not authorized to book appointments' });
        }

        const appointment = await Appointment.create({
            doctor_id,
            patient_id: targetPatientId,
            appointment_date,
            reason,
            status: 'PENDING'
        });

        res.status(201).json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        appointment.status = status;
        await appointment.save();
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAppointments, bookAppointment, updateStatus };
