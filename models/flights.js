const mongoose=require("mongoose")

const flightSchema=mongoose.Schema({
    flightNumber:{
        type:Number,
        unique: true,
        required:true,
    },
    Airline:{
        type:String,
         required:true,
    },
    Source:{
        type:String,
        required:true
    },
    
    Destination:{
        type:String,
        required:true
    },
    seats:{
        type:Number,
    },
    dayOfWeek: [
        {
            type : String,
        }
    ],
    ScheduledArrivalTime:{
        type:String,
        required:true,
    },
    ScheduledDepartureTime:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },

    
    
},{
    timestamps:true
},{collection:"flights_info"})

const flight=mongoose.model("flights_info",flightSchema);

module.exports=flight