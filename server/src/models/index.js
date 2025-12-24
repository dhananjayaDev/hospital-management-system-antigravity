const sequelize = require('../config/database');
const User = require('./User');
const Doctor = require('./Doctor');
const Patient = require('./Patient');
const Appointment = require('./Appointment');
const Bill = require('./Bill');

// Define Associations

// User -> Doctor/Patient
User.hasOne(Doctor, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Doctor.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Patient, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Patient.belongsTo(User, { foreignKey: 'user_id' });

// Doctor/Patient -> Appointment
Doctor.hasMany(Appointment, { foreignKey: 'doctor_id' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctor_id' });

Patient.hasMany(Appointment, { foreignKey: 'patient_id' });
Appointment.belongsTo(Patient, { foreignKey: 'patient_id' });

// Appointment -> Bill
Appointment.hasOne(Bill, { foreignKey: 'appointment_id' });
Bill.belongsTo(Appointment, { foreignKey: 'appointment_id' });

module.exports = {
    sequelize,
    User,
    Doctor,
    Patient,
    Appointment,
    Bill,
};
