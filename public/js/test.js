// const flights=require("../../models/flights")

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');
    const decodedData = decodeURIComponent(encodedData);
    const dataReceived = JSON.parse(decodedData);
    // console.log('Received Data:Data', dataReceived , "flightid: ", dataReceived[0].Fid);
    try{
        const fid = dataReceived[0].Fid;
        // console.log("asdfghjkllasdfghjkl/n/n/n/n/n/masdfg")
        const res=await fetch('/confirmuserdetails',{
            method:'post',
            body:JSON.stringify({dataReceived:dataReceived,fid:fid}),
            headers:{'Content-Type':'application/json'}
        });
        const data=await res.json();
        // display(dataReceived,fid);
    } catch (error) {
        console.log(error);
    }
    
})