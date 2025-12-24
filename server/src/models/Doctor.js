const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Doctor = sequelize.define('Doctor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    availability_schedule: {
        type: DataTypes.JSON, // Stores object like { "Mon": "09:00-17:00" }
        allowNull: true,
    },
}, {
    timestamps: false,
});

module.exports = Doctor;
