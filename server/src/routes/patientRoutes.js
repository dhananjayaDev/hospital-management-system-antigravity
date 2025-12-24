const express = require('express');
const router = express.Router();
const { getAllPatients, createPatient, getPatientHistory } = require('../controllers/patientController');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');

// Staff only routes
router.get('/', authMiddleware, requireRole(['ADMIN', 'RECEPTIONIST', 'DOCTOR']), getAllPatients);
router.post('/staff-create', authMiddleware, requireRole(['ADMIN', 'RECEPTIONIST']), createPatient);
router.get('/:id/history', authMiddleware, getPatientHistory);

module.exports = router;
