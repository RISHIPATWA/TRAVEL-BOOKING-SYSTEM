const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    destinationName: {
        type: String,
        required: true,
        trim: true
    },
    travelDate: {
        type: Date,
        required: true
    },
    numberOfTravelers: {
        type: Number,
        required: true,
        min: 1
    },
    packageType: {
        type: String,
        required: true,
        enum: ['Silver', 'Gold', 'Platinum']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    bookingStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending'
    },
    contactAddress: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', BookingSchema);
