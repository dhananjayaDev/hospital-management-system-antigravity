const bcrypt = require('bcrypt');
const { User, Patient, Appointment, Doctor } = require('../models');

// Staff: List all patients
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll({
            include: {
                model: User,
                attributes: ['name', 'email']
            }
        });
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Staff: Register a new patient (Walk-in)
const createPatient = async (req, res) => {
    try {
        const { name, email, date_of_birth, phone, address } = req.body;

        // Check if user exists (email must be unique)
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // Generate a default password for them (e.g., phone number or simple string)
        // In real app, might invite via email.
        const defaultPassword = phone || '123456';
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        user = await User.create({
            name,
            email,
            password_hash: hashedPassword,
            role: 'PATIENT',
        });

        const patient = await Patient.create({
            user_id: user.id,
            date_of_birth,
            phone,
            address,
        });

        res.status(201).json({ message: 'Patient registered successfully', patient, tempPassword: defaultPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getPatientHistory = async (req, res) => {
    try {
        const patientId = req.params.id;
        const appointments = await Appointment.findAll({
            where: { patient_id: patientId },
            include: [
                { model: Doctor, include: { model: User, attributes: ['name'] } }
            ],
            order: [['appointment_date', 'DESC']]
        });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAllPatients, createPatient, getPatientHistory };
