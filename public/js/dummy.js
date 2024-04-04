// const axios = require('axios');
const unirest = require('unirest')
// const getData = async () => {
    // const options = {
    //   method: 'GET',
    //   url: 'https://flight-info-api.p.rapidapi.com/schedules',
    //   params: {version: 'v2'},
    //   headers: {
    //     'X-RapidAPI-Key': 'f7e8bebf01msh4a4b6d31bd285fep1f8a44jsnfe4bf1d67e58',
    //     'X-RapidAPI-Host': 'flight-info-api.p.rapidapi.com'
    //   }
    // };
    
    // try {
    //     const response = await axios.request(options);
    //     console.log(response.data);
    // } catch (error) {
    //     console.error(error);
    // }

    // const response = await fetch('https://api.flightapi.io/onewaytrip/5f8b1ec2a9d31578961b4109f4dfd8/HEL/OUL/2024-05-20/1/0/0/Economy/USD', {
    //     method : 'GET',
    // })
    // .then(response => response.json)
    // .then(response => {
    //     console.log(response)
    // }) 
    // .catch(error) {
    //     console.log(error.message);
    // }

    unirest.get( "https://api.flightapi.io/onewaytrip/6603b5e9d51194bb4897fc55/HEL/OUL/2024-05-20/1/0/0/Economy/USD")
  .then(response => {
    console.log(response.body);
  })
  .catch(error => {
    console.log(error);
  });
 