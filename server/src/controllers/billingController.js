const { Bill, Appointment, Patient, User } = require('../models');

const getBills = async (req, res) => {
    try {
        const { role, id } = req.user;
        let where = {};

        // Patient sees own bills? Need to join with Appointment -> Patient
        // This is complex in Sequelize simple query.
        // Easiest is to find Appointments for patient first.
        if (role === 'PATIENT') {
            const patient = await Patient.findOne({ where: { user_id: id } });
            if (!patient) return res.json([]);

            // Find bills where appointment.patient_id = patient.id
            // Using include with where
            const bills = await Bill.findAll({
                include: {
                    model: Appointment,
                    where: { patient_id: patient.id },
                    include: { model: Patient, include: { model: User, attributes: ['name'] } }
                }
            });
            return res.json(bills);
        }

        // Admin/Receptionist see all
        const bills = await Bill.findAll({
            include: {
                model: Appointment,
                include: { model: Patient, include: { model: User, attributes: ['name'] } }
            }
        });
        res.json(bills);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createBill = async (req, res) => {
    try {
        const { appointment_id, amount } = req.body;

        // Verify appointment exists
        const appointment = await Appointment.findByPk(appointment_id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        const bill = await Bill.create({
            appointment_id,
            amount,
            status: 'UNPAID'
        });

        res.status(201).json(bill);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const payBill = async (req, res) => {
    try {
        const bill = await Bill.findByPk(req.params.id);
        if (!bill) return res.status(404).json({ message: 'Bill not found' });

        bill.status = 'PAID';
        await bill.save();
        res.json(bill);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getBills, createBill, payBill };
