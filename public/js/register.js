
const form = document.querySelector('form')

// console.log(form.email.value)
form.addEventListener('submit',async(e)=>{
    e.preventDefault()
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const age = form.age.value;
    const gender = form.gender.value;
    const phone = form.phone.value;

    try{
        const res = await fetch('/register',{
            method: 'post',
            body: JSON.stringify({name,email,password,age,gender,phone}),
            headers: {'Content-Type': 'application/json'}
        });
        const data=await res.json();
        console.log(data)
        if(data.success){
            location.assign('/login')
        }
    }
    catch(err){
        console.log("error",err)
    }

})