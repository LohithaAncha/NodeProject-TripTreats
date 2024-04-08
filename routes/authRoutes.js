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
const { default: mongoose, deleteModel } = require('mongoose');

                                                                                                                                                                                                         
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

router.get('/profile/edit',requireauth,(req,res)=>{
    
    res.render('editProfile',{data:req.user.user});
})

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

module.exports=router