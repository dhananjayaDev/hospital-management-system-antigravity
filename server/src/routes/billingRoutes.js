const express = require('express');
const router = express.Router();
const { getBills, createBill, payBill } = require('../controllers/billingController');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getBills);
router.post('/', authMiddleware, requireRole(['ADMIN', 'RECEPTIONIST']), createBill);
router.put('/:id/pay', authMiddleware, requireRole(['ADMIN', 'RECEPTIONIST', 'PATIENT']), payBill);

module.exports = router;
