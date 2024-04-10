const { Router } = require('express');
const router = Router()
const user = require("../models/users")
const flight = require('../models/flights')
const jwt=require("jsonwebtoken")
const {requireauth} = require("../middleware/authMiddleware")
const Passenger=require('../models/passenger');
const Razorpay=require('razorpay');
const { sendMailtoUser } = require('../services/mail');
const bookings=require('../models/bookings')
const { handlelogin, handleRegister, homepage, handleLogout, addflight, bookflight, viewflights, showticket, getabout,getPaymentpage, getProfile, search, createUser, addloggedinUser, createFlight, findflight, createPassenger, createPaymentOrder, sendwebhook, getProfileEdit } = require('../controllers/authcontrollers');

var razorpay = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,

});


const AWS = require('aws-sdk');

// Configure AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.aws_access_key,
  secretAccessKey: process.env.aws_secret_key,
  region: 'ap-south-1'
});



router.get('/login',handlelogin)

router.get('/register',handleRegister)

router.post('/register',createUser)



router.post('/login',addloggedinUser)



router.get('/home', requireauth ,homepage)


router.get('/logout', requireauth,handleLogout )



router.get('/addflights',requireauth,addflight)

// router.get('/test',requireauth,async (req,res)=>{
//     const flightinfo=await flight.findById()

// })

router.post('/addflights',requireauth,createFlight)


router.post('/findFlights',requireauth,findflight)



router.get('/bookflight/:id/:src/:des/:date', requireauth,bookflight)

router.post('/confirmuserdetails',requireauth,createPassenger)

// router.post('/completeData',async (req,res)=>{
//     const Flight = await flight.findOne({fid:req.body.id});
//     res.status(400).json(Flight);
// })


router.get('/viewflights',requireauth,viewflights)


router.post('/createOrder', createPaymentOrder);

router.get('/test',requireauth,showticket)


 router.get('/about',requireauth,getabout)


router.get('/paymentPage',requireauth,getPaymentpage);



router.post('/webhook', sendwebhook);

router.get('/profile',requireauth,getProfile)

// router.get('/testing', (req, res) => {
//     return res.render('sample');
// })


router.get('/search',search)

const axios = require('axios');
const { default: mongoose, deleteModel } = require('mongoose');

                                                                                                                                                                                                         


router.get('/profile/edit',requireauth,getProfileEdit)

router.post('/profile/edit', requireauth, async (req, res) => {
    try {
        const { name, age, gender, email, phone } = req.body;
        const id = req.user.id; 
        let user1 = await user.findById(id);
        if (!user1) {
            return res.status(404).send('User not found');
        }
        user1.name = name;
        user1.age = age;
        user1.gender = gender;
        user1.email = email;
        user1.phone = phone;
        user1 = await user1.save();
        const updatedUser=await user.findById(id);
        res.render('profile',{data:req.user.user,user:updatedUser})
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).send('Error updating user details');
    }
});

router.post ('/profile/delete',requireauth,async(req,res)=>{
        try {
            const id=req.user.id;
            let user1=await user.findById(id);
            if(!user1){
                return res.status(404).send("User not found");
            }
            
            const deleted=await user.findByIdAndDelete(id);
            res.cookie('jwt','',{maxAge: 1});
            res.sendStatus(204); 
        } catch (error) {
            console.error('Error deleting user details:', error);
            res.status(500).send('Error deleting user details');
        }
    

})

router.get('/bookings',requireauth,async(req,res)=>{
   const userid=req.user.id;
   const bookinginfo=await bookings.find({userId:userid})
   //console.log("found booking:",booking);
   const currentDate=new Date();
   const previousbookings=[];
   const upcomingflights=[];
   const flightsprevious=[];
   const flightsupcoming=[];
   for (const booking of bookinginfo) {
    const date = new Date(booking.dateOfJourney);
    const params = {
        Bucket: 'triptreats',
        Key: booking.uuid, 
    };
    const signedUrl = s3.getSignedUrl('getObject', params);
    console.log(booking.uuid)
    booking.uuid = signedUrl;
    console.log(booking.uuid, signedUrl)
    if (date < currentDate) {
        previousbookings.push(booking);
        const flightId = booking.flightId;       
        const flightInfo = await flight.findById(flightId);       
        flightsprevious.push(flightInfo);
    }
    else{
        upcomingflights.push(booking);
        const flightId = booking.flightId;       
        const flightInfo = await flight.findById(flightId);       
        flightsupcoming.push(flightInfo);
    } 
}



//    previousbookings.sort((a,b)=>new Date(b.dateOfJourney)-new Date(a.dateOfJourney));
//    upcomingflights.sort((a,b)=>new Date(a.dateOfJourney)-new Date(b.dateOfJourney))
//     console.log("previous:",previousbookings);
//    console.log("upcoming:",upcomingflights)

   res.render("bookings",{previousbookings:previousbookings,upcomingflights:upcomingflights,data:req.user.user,flightsprevious:flightsprevious,flightsupcoming:flightsupcoming});

})


module.exports=router