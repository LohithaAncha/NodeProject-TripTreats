const mongoose=require("mongoose")
const bcrypt=require("bcrypt");


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    phone:{
         type:String,
         required:true,
         minlength:10
    },
    password:{
        type:String,
        required:true,
        minlength:5
    },
    admin:{
        type: Boolean,
        default: false,
        required: false
    }
})


userSchema.pre('save',async function(next){

    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

userSchema.statics.login=async function(email,password){
    const user=await this.findOne({email});
    if(user){
        const auth=await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        return "Password not matched"
    }
    return "Email not matched";
}

const user=mongoose.model("user",userSchema);

module.exports=user;


 