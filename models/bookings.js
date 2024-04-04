const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'flights', 
        required: true
    },
    passengerIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'passenger' 
    }],
    dateOfBooking: {
        type: Date,
        required: true
    },
    numberOfPassengers: {
        type: Number,
        required: true
    },
    dateOfJourney: {
        type: Date,
        required: true
    },
    
});
const booking = mongoose.model('booking', bookingSchema);

module.exports = booking;
