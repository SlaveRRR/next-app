import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, Roles } from '@/types/user';


const userSchema = new Schema<IUser>({
    id: {
        type: Number,
        unique: true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    emailVerifiedAt:{
        type:String,
        default:''
    },
    createdAt:{
        type:String,
        default:new Date().toLocaleDateString()
    },
    rememberToken:{
        type:String,
        default:''
    },
    updatedAt:{
        type:String,
        default:''
    },
    role:{
        type:String,
        default:Roles.user
    },
    
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this['password'] = await bcrypt.hash(this.password,10)
})

export default mongoose.models.User ?? model<IUser>('User', userSchema);











