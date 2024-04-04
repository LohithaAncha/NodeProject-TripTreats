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
const { handlelogin, handleRegister, homepage, handleLogout, addflight, bookflight, viewflights, showticket, getabout,getPaymentpage, getProfile, search, createUser, addloggedinUser, createFlight, findflight, createPassenger, createPaymentOrder, sendwebhook } = require('../controllers/authcontrollers');

var razorpay = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,

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



router.get('/bookflight/:id/:src/:des', requireauth,bookflight)

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
const { default: mongoose } = require('mongoose');

                                                                                                                                                                                                         
// router.get('/bookings',async(req,res)=>{
//     try {
//         const userId = req.user.id; 
//         const bookings = await Booking.find({ userId });
//         res.render('bookings',{bookings});
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })
//  router.get('/bookings/:id',async (req, res) => {
//     try {
//         const bookingId = req.params.id;
//         const booking = await Booking.findById(bookingId);
//         if (!booking) {
//             return res.status(404).json({ message: 'Booking not found' });
//         }
//         res.status(200).json({ booking });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })



module.exports=router