const form = document.querySelector('form')
let passengers;// console.log(form.email.value)
const searchForm = document.getElementById('search-form')
form.addEventListener('submit',async(e)=>{
    e.preventDefault()
    const source = form.source.value;
    const destination = form.destination.value;
    passengers = form.passenger.value;
    const date = form.tripdate.value;
    
    try{
        const res = await fetch('/findFlights',{
            method: 'post',
            body: JSON.stringify({source,destination,date}),
            headers: {'Content-Type': 'application/json'}
        });
        const data=await res.json();
        console.log(data)
        //console.log(data.flights.length)
        displayFlight(data);
    }
    catch(err){
        console.log(err)
    }

    
})


function displayFlight(data){
    // const card__container=document.createElement('div');
    // card__container.classList.add('card__container');
    for(let i = 0 ; i < data.flights.length ; i++){

        const card__article = document.createElement('div');
        card__article.classList.add('card__article');
         
        // const thefront = document.createElement('div');
        // thefront.classList.add('thefront');
    
        // const theback = document.createElement('div');
        // theback.classList.add('theback');
        
        const image=document.createElement('img')
        image.src="/static/assets/fimage.png";
        image.classList.add('card__img');
        card__article.appendChild(image)

        const name=document.createElement('h2');
        name.innerText=data.flights[i].Airline;
        card__article.appendChild(name)
        
        const id=document.createElement('h3');
        id.innerText="Flight Id:"+data.flights[i].flightNumber;
        card__article.appendChild(id)

        const card__data = document.createElement('div');
        card__data.classList.add('card__data');
        
        

        const price=document.createElement('h3');
        price.classList.add("card__description")
        price.innerText="Ticket Price :"+data.flights[i].price;
        card__data.appendChild(price)
        
        const arrtime=document.createElement('h3');
        arrtime.innerText="Arrival Time : "+data.flights[i].ScheduledArrivalTime;
        card__data.appendChild(arrtime);
        
        const deptime=document.createElement('h3');
        deptime.innerText="Departure Time : "+data.flights[i].ScheduledDepartureTime;
        card__data.appendChild(deptime);
         
        
        const button = document.createElement('button');
        button.classList.add('Fbtn');
        button.innerText = 'Book Your Flight';
        button.addEventListener('click',async (e)=>{
            const paramValue = passengers+data.flights[i].flightNumber;
            const src = data.flights[i].Source;
            const des = data.flights[i].Destination;
            const url = `/bookflight/${paramValue}/${src}/${des}`;
            window.location.href = url;
        })
        card__data.appendChild(button);

        card__article.appendChild(card__data);
        // card__container.appendChild('card_article');
         document.getElementById('flights').appendChild(card__article);
    }   

    searchForm.style.display = "none";

        // console.log(card__container)
        // document.getElementById('flights').appendChild(card__container);
}


const SourceSelect = document.getElementById('Source');

SourceSelect.addEventListener('submit', () => {
    const response = fetch(`/search?term=${SourceSelect.value}`, {
        method : 'GET',
        headers : {
            'Content-Type': 'application/json',
        }
    })

    const responseData = response.json();

    SourceSelect.innerHTML = ''

    responseData.forEach(option => {
        const optionEle = document.createElement('option');
        optionEle.value = option;
        optionEle.textContent = option;
        SourceSelect.appendChild(optionEle);
    });
})