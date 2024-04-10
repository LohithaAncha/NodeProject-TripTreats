// Next Page JavaScript
let queryParams,doj;
function callFunction() {
    console.log(queryParams);
    window.location.href = `/test?${queryParams}&doj=${doj}`;
}


document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');
   // const count=urlParams.get('count');
    doj=urlParams.get('dofjourney');
    console.log("Date before parse:",doj);
    // const fsource=urlParams.get('fsource');
    // const fdestination=urlParams.get('fdestination');
    // // const decodedSource=decodeURIComponent(fsource);
    // const decodedDate=decodeURIComponent(doj);
    // const decodedDestination=decodeURIComponent(fdestination);
  //  const decodedcount=decodeURIComponent(count);
    const decodedData = decodeURIComponent(encodedData);
    const dataReceived = JSON.parse(decodedData);
    // const source=JSON.parse(decodedSource);
    // const date=JSON.parse(decodedDate);
    // const destination=JSON.parse(decodedDestination);

    console.log('Received Data:', dataReceived);

   

    const jsonData = JSON.stringify(dataReceived);
    const encodeddata = encodeURIComponent(jsonData);
    queryParams = new URLSearchParams({ data: encodeddata}).toString();


});


