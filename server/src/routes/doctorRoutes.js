const express = require('express');
const router = express.Router();
const { getAllDoctors, createDoctor, getDoctorSchedule } = require('../controllers/doctorController');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');

// Public or Protected? Listing doctors usually public for patients to book?
// For MVP, letting Patient see doctors is fine.
router.get('/', authMiddleware, getAllDoctors);

// Get Schedule (Public for booking)
router.get('/:id/schedule', authMiddleware, getDoctorSchedule);

// Admin only: Create Doctor
router.post('/', authMiddleware, requireRole(['ADMIN']), createDoctor);

module.exports = router;
