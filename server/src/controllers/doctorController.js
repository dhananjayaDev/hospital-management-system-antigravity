const bcrypt = require('bcrypt');
const { User, Doctor } = require('../models');

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll({
            include: {
                model: User,
                attributes: ['name', 'email']
            }
        });
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createDoctor = async (req, res) => {
    try {
        const { name, email, password, specialization, availability_schedule } = req.body;

        // Check existing
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password_hash: hashedPassword,
            role: 'DOCTOR',
        });

        const doctor = await Doctor.create({
            user_id: user.id,
            specialization: specialization || 'General',
            availability_schedule: availability_schedule || {},
        });

        res.status(201).json({ message: 'Doctor created', doctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getDoctorSchedule = async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
        res.json(doctor.availability_schedule);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAllDoctors, createDoctor, getDoctorSchedule };
