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
    
    numberOfPassengers: {
        type: Number,
        required: true
    },
   
    dateOfJourney:{
        type:Date,
        required:true
    },
    uuid:{
        type:String,
        required:true
    }
    
});
const booking = mongoose.model('booking', bookingSchema);

module.exports = booking;
