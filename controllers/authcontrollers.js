const jwt=require('jsonwebtoken');
const user=require('../models/users')
const flight = require('../models/flights')
const Passenger=require('../models/passenger');
const { sendMailtoUser } = require('../services/mail');
const axios = require('axios');
const { default: mongoose } = require('mongoose');
const Razorpay=require('razorpay');
const booking=require('../models/bookings');
const { v4: uuidv4 } = require('uuid');





// Generate a UUID
// Output: a12b5b18-7d9b-4ad0-ba70-6ecab33f088b (Example UUID)

let razorpay = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,

});
require('dotenv').config()


//--------------------------------------------------------
//gets
const handleIndex=(req,res)=>{
    const token = req.cookies.jwt;
    if(token){
        res.redirect('home')
    }
    else{
        res.render("index")
    }
}
const handlelogin=(req,res)=>{
    const token=req.cookies.jwt;
    if(token){
        res.redirect("home");
    }
    else{
        res.render("login");
    }
}

const handleRegister=(req,res)=>{
    const token=req.cookies.jwt;
    if(token){
        res.redirect("login");
    }
    else{
        res.render("register");
    }
}

const homepage=async (req,res)=>{
    const token = req.cookies.jwt;
    const secretKey = process.env.SECRET_KEY;
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
        } else {
            const userId = decoded.id;
            const USER = await user.findOne({_id:userId});
           // console.log("HOME USER",USER);
            res.render('home',{USER: USER, data : req.user.user, flights : null});
        }
    });
}

const handleLogout=(req,res)=>{
    res.cookie('jwt','',{maxAge: 1});
    res.render('login');
}


const addflight=(req,res)=>{
    const token = req.cookies.jwt;
    const secretKey = 'Trip Treats';
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
        } else {
            const userId = decoded.id;
            const USER = await user.findOne({_id:userId});
            res.render('addflights',{USER, data : decoded.user});
        }
    });
}



const bookflight=async (req, res) => {
    
    const src = req.params.src;
    const des = req.params.des;
    const doj=req.params.date
    console.log("date",doj)
   const count=parseInt(req.params.id.charAt(0));
   const fnum=parseInt(req.params.id.slice(1))
            
            console.log("params:",req.params.id.charAt(0))
            const userId = req.user.id;
           // console.log(req.user.id)
            const USER = await user.findOne({_id:userId});
            const Flight = await flight.findOne({flightNumber:fnum, Source : src, Destination : des});      
            res.render('bookflight',{USER:USER,Flight:Flight, data : req.user.user,count:count,dateofjourney:doj});
    
}



const viewflights=async (req,res)=>{
            
            try {
                const flights=await flight.find({});
                res.render('viewflights',{flights:flights, data : req.user.user})
            } catch (error) {
                console.log(error)
            }
      
}


//p
const showticket=async (req,res)=>{   
    //console.log('here1', req.query);
            
            try {
                const uuid = uuidv4();

            //console.log(uuid); 
            const userData = await user.findOne({_id : req.user.id});
           // console.log("query:",req.query.data)
            const jsonData = req.query.data;
            const jsonDate=req.query.doj;
           // console.log("test date:",jsonDate)
            let decode = decodeURIComponent(jsonData);
            decode=JSON.parse(decode);
            //console.log("decode",decode)
            
            const flightinfo=await flight.findOne({flightNumber:decode[0].Fid,Source:decode[0].fsrc,Destination:decode[0].fdes});
           // console.log("flight:",flightinfo)
            
            const userid=req.user.id;
            const flightid=flightinfo._id;
            const nums=decode.length;

            // Define parameters for generating signed URL
            
           
            const newbooking=await booking.create({userId:userid,flightId:flightid,numberOfPassengers:nums,dateOfJourney:jsonDate,uuid:uuid})
           // console.log("new booking:",newbooking);
            sendMailtoUser(userData.email, {decode, flightinfo});
            res.render("test",{decode,flightinfo,data : req.user.user, userProfile : userData.name,uuid:uuid});   
            } catch (error) {
                console.log(error)
            }
            
}

const getabout=(req,res)=>{
        res.render('about',{data: req.user.user})        
 }

 const getPaymentpage=async (req, res) => {
    const orderId = req.query.order_id; 
    const jsonData = req.query.data;
    const count=req.query.count;
    const decodecount=decodeURIComponent(count);
    const usercount=JSON.parse(decodecount);
    const decode = decodeURIComponent(jsonData);
    const data = JSON.parse(decode);
    const Data = data;
    try{
        const fly = await flight.findOne({flightNumber:data[0].Fid});
        res.render('paymentPage', { orderId,fly,Data,data : req.user.user,users:usercount});
    }catch(err){
        console.log(err);
    }
}
   
const getProfile=async (req,res)=>{

            const userId=req.user.id;
            const userinfo=await user.findOne({_id:userId})
            //console.log(userinfo)
            res.render("profile",{user:userinfo,data : req.user.user})
        
}

//Not done
const search= async (req, res) => {
    try {
        db = await mongoose.connection.db.collection('flights_infos')
        const data = await db.aggregate([
            {
                "$search": {
                    "autocomplete": {
                        "query": `${req.query.term}`,
                        "path": "Source",
                        "fuzzy": {
                            "maxEdits": 2
                        }
                    }
                }
            },
            {
                $group: {
                    _id: '$Source',
                }
            },
            {
                $limit: 10  
            }
        ]).toArray();
        return res.json(data);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

//------------------
//not done
const getProfileEdit=(req,res)=>{
    
    res.render('editProfile',{data:req.user.user});
}
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
//posts


const createUser=async(req,res)=>{
    
    const { name,age,gender,phone,email,password}=req.body;
    console.log(name)
   try {
    const data=await user.create({name,age,gender,phone,email,password,admin: false});
    
   
    res.status(200).json({success:"user created successfully"})
   } catch (error) {
    const code=error.code;
    res.status(500).json({message:error.message});
   }
}
const CreateToken = (id, user) => {
    return jwt.sign({id, user},"Trip Treats",{expiresIn:24*60*60})
}
const addloggedinUser=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const data=await user.login(email,password);
        const token=CreateToken(data._id, (data.admin === true ? "admin" : "user"));
        res.cookie('jwt',token,{httpOnly:true,maxAge:24*60*60*1000});
        res.status(200).json({message:"logged"});
    } catch (error) {
        console.log(error);
        res.status(500).json({failed:error.message})
    }
}

const createFlight=async (req,res)=>{
    let {flightNumber,Airline,Source,Destination,seats,dayOfWeek,ScheduledArrivalTime,ScheduledDepartureTime,price} = req.body;
    Airline=Airline.toUpperCase();
    Source=Source.toUpperCase();
    Destination=Destination.toUpperCase();
    try{
        const existingFlight = await flight.findOne({flightNumber});
        if(existingFlight){
            res.status(500).json({"message":"Flight Id is not Unique"});
        }
        else{
            const Flight = await flight.create({flightNumber,Airline,Source,Destination,seats,dayOfWeek,ScheduledArrivalTime,ScheduledDepartureTime,price});
            res.status(200).json({success:"Flight created successfully"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message});
    }

}

const findflight=async (req,res)=>{
    let {source,destination,date} = req.body;

     date = new Date(date);

    const dayOfWeek = date.getDay(); 
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[dayOfWeek];
    //console.log(source, destination);

    try{
        const flights = await flight.find({Source:source,Destination:destination,dayOfWeek: { $in : [dayName]}}).limit(11);
        return res.status(200).json({flights})
    }
    catch(err){
        res.status(500).json({error:err})
    }

}

const createPassenger=async (req,res)=>{
    const {dataReceived,fid}=req.body;
    try{
        for(let i = 0 ; i < dataReceived.length ; i++){
            await Passenger.create({
                pname:dataReceived[i].name,
                age:dataReceived[i].age,
                gender:dataReceived[i].gender,
                FlightId:fid,
            })
        }
        const Flight = await flight.findOne({flightNumber:fid});
        Flight.count -= dataReceived.length;
        Flight.save();
        res.status(200).json({message:"Passenger details saved successfully"})
    }
    catch(error){
        res.status(500).json({error:error.message});
    }    
}

//p
const createPaymentOrder=async (req, res) => {
    try {
        const options = {
            amount: 50000,
            currency: 'INR',
            receipt: 'order_rcptid_11' 
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json({order:order});
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
}

//not done
const sendwebhook=async (req, res) => {
    const { payment_id, order_id, signature } = req.body;
    // const generatedSignature = razorpay.webhooks.validateSignature(req.rawBody, signature);
    const generatedSignature = razorpay.validateWebhookSignature(req.rawBody, signature);
    console.log("webhookresponse:",generatedSignature);
    if (!generatedSignature) {
        return res.status(400).send('Invalid webhook signature');
    }

    // Handle payment success (e.g., update database, send confirmation email)
    console.log('Payment successful. Payment ID:', payment_id);
    res.status(200).send('Webhook received');
}


module.exports={handlelogin,handleRegister,homepage,handleLogout,addflight,bookflight,viewflights,showticket,getabout,
                getPaymentpage,getProfile,search,
                createUser,addloggedinUser,createFlight,findflight,createPassenger,createPaymentOrder,sendwebhook,razorpay,handleIndex,
            getProfileEdit}