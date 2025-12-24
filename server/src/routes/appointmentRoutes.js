const express = require('express');
const router = express.Router();
const { getAppointments, bookAppointment, updateStatus } = require('../controllers/appointmentController');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getAppointments);
router.post('/', authMiddleware, requireRole(['PATIENT', 'RECEPTIONIST']), bookAppointment);
router.put('/:id', authMiddleware, requireRole(['DOCTOR', 'ADMIN', 'RECEPTIONIST']), updateStatus);

module.exports = router;
