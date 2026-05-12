const Booking = require('../models/Booking');

// Add new booking
const addBooking = async (req, res) => {
    try {
        const { destinationName, travelDate, numberOfTravelers, packageType, price, contactAddress } = req.body;
        
        const newBooking = new Booking({
            destinationName,
            travelDate,
            numberOfTravelers,
            packageType,
            price,
            contactAddress,
            user: req.user.userId // From JWT middleware
        });

        await newBooking.save();
        
        res.status(201).json({
            message: 'Booking created successfully',
            booking: newBooking
        });
    } catch (error) {
        console.error('Add booking error:', error);
        res.status(500).json({ message: 'Server error while creating booking' });
    }
};

// Get all bookings for a user
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.userId })
            .sort({ createdAt: -1 });
        
        res.json({
            message: 'Bookings retrieved successfully',
            bookings
        });
    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({ message: 'Server error while fetching bookings' });
    }
};

// Get booking by ID
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findOne({ 
            _id: req.params.id, 
            user: req.user.userId 
        });
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        res.json({
            message: 'Booking retrieved successfully',
            booking
        });
    } catch (error) {
        console.error('Get booking error:', error);
        res.status(500).json({ message: 'Server error while fetching booking' });
    }
};

// Update booking
const updateBooking = async (req, res) => {
    try {
        const { destinationName, travelDate, numberOfTravelers, packageType, price, contactAddress, bookingStatus } = req.body;
        
        const booking = await Booking.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId },
            { destinationName, travelDate, numberOfTravelers, packageType, price, contactAddress, bookingStatus },
            { new: true, runValidators: true }
        );
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        res.json({
            message: 'Booking updated successfully',
            booking
        });
    } catch (error) {
        console.error('Update booking error:', error);
        res.status(500).json({ message: 'Server error while updating booking' });
    }
};

// Delete booking
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.user.userId 
        });
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        res.json({
            message: 'Booking deleted successfully',
            booking
        });
    } catch (error) {
        console.error('Delete booking error:', error);
        res.status(500).json({ message: 'Server error while deleting booking' });
    }
};

module.exports = {
    addBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking
};
