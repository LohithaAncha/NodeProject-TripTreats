const btn=document.querySelector('.profileditbtn');
btn.addEventListener('click',async(e)=>{
   e.preventDefault();
   const data=JSON.stringify(userData)
   const encodeduser=encodeURIComponent(data)
   const queryparams=new URLSearchParams({data:encodeduser}).toString();
    window.location.href=`/profile/edit?${queryparams}`;
})
const dltbtn=document.querySelector('.profiledltbtn');
dltbtn.addEventListener('click',async (e)=>{
    e.preventDefault();
    const confirmDelete = confirm('Are you sure you want to delete your account?');
    if (confirmDelete) {
        try {
            const response = await fetch('/profile/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}) 
            });

            if (response.ok) {
                console.log("deleted")
                
                
                window.location.href = '/login';
            } else {
                console.error('Error deleting user:');
                
            }
        } catch (error) {
            console.error('Error deleting user:', error);
           
        }
    }
})
