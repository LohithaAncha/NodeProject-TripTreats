const form = document.querySelector('form')

// console.log(form.email.value)
form.addEventListener('submit',async(e)=>{
    e.preventDefault()
    const email = form.email.value;
    const password = form.password.value;

    try{
        const res = await fetch('/login',{
            method: 'post',
            body: JSON.stringify({email,password}),
            headers: {'Content-Type': 'application/json'}
        });
        const data=await res.json();
        if(data.data=="Password not matched"){
            console.log(data);
            document.getElementById("passworderror").textContent=data.data;
            document.getElementById("emailerror").textContent="";
        }
        else if(data.data=="Email not matched"){
            console.log(data);
            document.getElementById("emailerror").textContent=data.data;
            document.getElementById("passworderror").textContent="";
        }
        console.log(data)
        if(data.message){
            location.assign('/home')
        }
    }
    catch(err){
        console.log(err)
    }

})