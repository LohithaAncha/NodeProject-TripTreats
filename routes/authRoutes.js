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
const { handlelogin, handleRegister, homepage, handleLogout, addflight, bookflight, viewflights, showticket, getabout,getPaymentpage, getProfile, search, createUser, addloggedinUser, createFlight, findflight, createPassenger, createPaymentOrder, sendwebhook, getProfileEdit, getBookings, postProfileChanges, deleteProfile, getBookingEdit, postBookingChanges, deletebooking } = require('../controllers/authcontrollers');

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

router.post('/profile/edit', requireauth, postProfileChanges);

router.post ('/profile/delete',requireauth,deleteProfile)

router.get('/bookings',requireauth,getBookings)

router.get('/bookings/edit/:id',requireauth,getBookingEdit)

router.post('/bookings/edit/:id',requireauth,postBookingChanges);

router.get('/bookings/delete/:id',requireauth,deletebooking);
module.exports=router