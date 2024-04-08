document.addEventListener('DOMContentLoaded',async()=>{
    const urlParams=new URLSearchParams(window.location.search);
    const encodedData=urlParams.get('data');
    const decodedData=decodeURIComponent(encodedData);
    const dataReceived=JSON.parse(decodedData);
    console.log("Before",dataReceived)
    document.getElementById('name').value = dataReceived.name
    document.getElementById('age').value=dataReceived.age
    document.getElementById('gender').value=dataReceived.gender
    document.getElementById('email').value=dataReceived.email
    document.getElementById('phone').value=dataReceived.phone
    //console.log('Recieved:',dataReceived)
});