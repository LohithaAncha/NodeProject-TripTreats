//const flight = require("../../models/flights");


function Create(tag,name,parent){
    const temp=document.createElement(tag);
    temp.innerText=name;
    // temp.style.paddingLeft='70px';
    // temp.style.paddingTop='20px';
    parent.appendChild(temp);
}
function displayFlight(data){
    for(let i=0;i<30;i++){
        const card__article=document.createElement('div');
        card__article.classList.add('card__article');
        const image=document.createElement('img')
        image.src="/static/assets/fimage.png";
        card__article.appendChild(image)

        Create('h2',data[i].Airline,card__article);
        Create('h3',data[i].flightNumber,card__article);
        Create('h3','Source: '+data[i].Source,card__article);
        Create('h3','Destination: '+data[i].Destination,card__article);

        const card__data=document.createElement('div');
        card__data.classList.add('card__data');

        const price=document.createElement('h3');
        price.classList.add("card__description")
        price.innerText="Ticket Price :"+data[i].price;
        card__data.appendChild(price)

        const arrtime=document.createElement('h3');
        arrtime.innerText="Arrival Time : "+data[i].ScheduledArrivalTime;
        card__data.appendChild(arrtime);
        
        const deptime=document.createElement('h3');
        deptime.innerText="Departure Time : "+data[i].ScheduledDepartureTime;
        card__data.appendChild(deptime);
         
        
        // const button = document.createElement('button');
        // button.classList.add('Fbtn');
        // button.innerText = 'Book Your Flight';
        // button.style.width = '200px'; 
        // button.style.height = '50px'; 
        // button.addEventListener('click',async (e)=>{
        //     const paramValue = data[i].fid;
        //     console.log(paramValue)
        //     const url = `/bookflight/${paramValue}`
        //     window.location.href = url;
        // })

        
        // card__data.appendChild(button);

        card__article.appendChild(card__data);
        // card__container.appendChild('card_article');
         document.getElementById('flights').appendChild(card__article);
        }
    
}


displayFlight(flightArray);