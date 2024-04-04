const mongoose=require("mongoose")



const passengerSchema=mongoose.Schema({
    pname:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true,
        
    },
    gender:{
        type:String,
        required:true,
    },
    FlightId:{
        type:String,
        required:true,
    },
    // bookingId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'booking', 
    //     required: true
    // },
},
{
    timestamps:true
}
)




const Passenger=mongoose.model("Passenger",passengerSchema);

module.exports=Passenger;
