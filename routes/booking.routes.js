const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const {
    addBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking
} = require('../controllers/booking.controller');

// All booking routes require authentication
router.use(auth);

// POST /api/bookings - Add new booking
router.post('/', addBooking);

// GET /api/bookings - Get all bookings for authenticated user
router.get('/', getAllBookings);

// GET /api/bookings/:id - Get booking by ID
router.get('/:id', getBookingById);

// PUT /api/bookings/:id - Update booking
router.put('/:id', updateBooking);

// DELETE /api/bookings/:id - Delete booking
router.delete('/:id', deleteBooking);

module.exports = router;
