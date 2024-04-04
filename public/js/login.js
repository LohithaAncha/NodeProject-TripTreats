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
        console.log(data)
        if(data.message){
            location.assign('/home')
        }
    }
    catch(err){
        console.log(err)
    }

})