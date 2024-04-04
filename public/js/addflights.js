const form = document.querySelector('form')

// console.log(form.email.value)
form.addEventListener('submit',async(e)=>{
    const fid=form.flightId.value;
    const fname=form.fname.value;
    const source = form.source.value;
    const destination = form.destination.value;
    const passengers = form.count.value;
    const date = form.tripdate.value;
    const arrtime=form.arrivaltime.value;
    const deptime=form.departuretime.value;
    const price=form.price.value;
   

    try{
        const res = await fetch('/addflights',{
            method: 'post',
            body: JSON.stringify({flightNumber:fid,Airline:fname,Source:source,Destination:destination,seats:passengers,dayOfWeek:date,ScheduledArrivalTime:arrtime,ScheduledDepartureTime:deptime,price:price}),
            headers: {'Content-Type': 'application/json'}
        });

        const data=await res.json();
        console.log(data)
        // console.log(data)
        // if(data.message){
        //     location.assign('/home')
        // }
    }
    catch(err){
        console.log(err)
    }
    console.log(arrtime,fid)

})