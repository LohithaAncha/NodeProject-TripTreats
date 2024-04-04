// const bookflight=async (req, res) => {
//     const token=req.cookies.jwt;
//     const src = req.params.src;
//     const des = req.params.des;
//    const fnum=parseInt(req.params.id.slice(1))
//    //console.log("params:",fnum)
//     jwt.verify(token, secretKey, async (err, decoded) => {
//         if (err) {
//             console.error('Error verifying token:', err);
//         } else {
//             const userId = decoded.id;
//             const USER = await user.findOne({_id:userId});
//             const Flight = await flight.findOne({flightNumber:fnum, Source : src, Destination : des});
//             console.log(Flight);
//            // console.log("Flight:",Flight,USER);
//             res.render('bookflight',{USER,Flight, data : decoded.user,count});
//         }
//     });
    
// }

// const viewflights=async (req,res)=>{
//     const token = req.cookies.jwt;
//     const secretKey = process.env.SECRET_KEY;
//     //console.log("home:" , req)
//     jwt.verify(token, secretKey, async (err, decoded) => {
//         if (err) {
//             console.error('Error verifying token:', err);
//         } else {
//             try {
//                 const flights=await flight.find({});
//                 res.render('viewflights',{flights:flights, data : decoded.user})
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//     }); 
      
// }

const getPaymentpage=async  (req, res) => {

    const token = req.cookies.jwt;
    const secretKey = process.env.SECRET_KEY;
    
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
        } else {
            const orderId = req.query.order_id; 
            const jsonData = req.query.data;
            const count=req.query.count;
            const decodecount=decodeURIComponent(count);
            const usercount=JSON.parse(decodecount);
            //console.log("usercount",usercount);
            const decode = decodeURIComponent(jsonData);
            const data = JSON.parse(decode);
            const Data = data;
            //console.log("data21",data)

            try{
             const fly = await flight.findOne({flightNumber:data[0].Fid});
             //console.log(fly)
             res.render('paymentPage', { orderId,fly,Data,data : decoded.user,users:usercount});
            }catch(err){
               console.log(err);
            }
        }
    }); 
    
}

const getProfile=async (req,res)=>{

    const token = req.cookies.jwt;
    const secretKey = 'Trip Treats';
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
        } else {
           
            const userId=decoded.id;
            const userinfo=await user.findOne({_id:userId})
            //console.log(userinfo)
            res.render("profile",{user:userinfo,data : decoded.user})
        }
    });
}

// const ticket=async (req,res)=>{    
//     const token = req.cookies.jwt;
//     const secretKey = 'Trip Treats';
    
//     jwt.verify(token, secretKey, async (err, decoded) => {
//         if (err) {
//             console.error('Error verifying token:', err);
//         } else {
//             console.log(req.user);
//             // get user details form the database
//             const userData = await user.findOne({_id : req.user.id});
//             // console.log(userData)

//             const jsonData = req.query.data;
//             // console.log(jsonData);
//             let decode = decodeURIComponent(jsonData);
//             decode=JSON.parse(decode);

//             console.log(userData);

//             // console.log("test"+decode[0].Fid);
//             const flightinfo=await flight.findOne({flightNumber:decode[0].Fid});

//             // console.log("data ",decode)
//             sendMailtoUser(userData.email, {decode, flightinfo});
//             res.render("test",{decode,flightinfo,data : decoded.user, userProfile : userData.name});
//         }
//     });    
// }







//test


describe('bookflights',()=>{
    it('should render bookflightpage with flights details if token is verified', () => {
        const req = {
            cookies: { jwt: 'token' },
            params: { id: '1234', src: 'Source', des: 'Destination' }
        };
        const res = {
            render: sinon.spy()
        };
        const decoded = { id: 'userId', user: 'userData' };
        const fakeUser = { _id: 'userId' };
        const fakeFlight = { flightNumber: 1234, Source: 'Source', Destination: 'Destination' };

        sinon.stub(jwt, 'verify').callsFake((token, secretKey, callback) => {
            callback(null, decoded);
        });
        sinon.stub(user, 'findOne').returns(fakeUser);
        sinon.stub(flight, 'findOne').returns(fakeFlight);

        bookflight(req, res);

        expect(res.render.calledWith('bookflight',{
            USER: fakeUser,
            Flight: fakeFlight,
            data: 'userData',
            count: 1234 // Make sure count is of type number
        }));

        jwt.verify.restore();
        user.findOne.restore();
        flight.findOne.restore();
    })
    
    it('should handle error if token verification fails',  () => {
        const req = { cookies: { jwt: 'invalidToken' } };
        const res = {
            render: sinon.stub(),            
        };
        const error = new Error('Invalid token');
        sinon.stub(console,'error');
        sinon.stub(jwt, 'verify').callsFake((token, secretKey, callback) => {
            callback(error);
        });
        
        bookflight(req, res);
        
        expect(res.render.called).to.be.false;
        expect(console.error.called).to.be.false;
    
       
        jwt.verify.restore();
        console.error.restore();

    });
    
    
    
})
