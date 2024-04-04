// Next Page JavaScript
let queryParams;
async function callFunction() {
    console.log(queryParams);
    window.location.href = `/test?${queryParams}`;
}


document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');
    const count=urlParams.get('count');
    const decodedcount=decodeURIComponent(count);
    const decodedData = decodeURIComponent(encodedData);
    const dataReceived = JSON.parse(decodedData);
    console.log('Received Data:', dataReceived);



    const jsonData = JSON.stringify(dataReceived);
    const encodeddata = encodeURIComponent(jsonData);
    queryParams = new URLSearchParams({ data: encodeddata }).toString();

 


});

