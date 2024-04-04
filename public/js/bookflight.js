const form=document.querySelector('.user-form');
const temp = document.querySelector('.confirm-button');
const Fid = temp.id;
const count=parseInt(form.id);

form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    // try {
        const userData=[];
        for(let i=0;i<count;i++){
            const nameInput = form.querySelector(`#name${i}`);
            const name = nameInput.value;
            const ageInput=form.querySelector(`#age${i}`);
            const age=ageInput.value;
            const genInput=form.querySelector(`#gender${i}`);
            const gender=genInput.value;
            //console.log(name,age,gender)
            userData.push({name,age,gender,Fid});
        }
        console.log(userData);        
        const jsonData = JSON.stringify(userData);
        const encodedData = encodeURIComponent(jsonData);
        const queryParams = new URLSearchParams({ data: encodedData,count:count }).toString();
        window.location.href = `/paymentPage?${queryParams}`;
    
    
})