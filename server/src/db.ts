import mongoose from 'mongoose'
interface IUser extends mongoose.Document{
    username:string,
    password:string,
    firstName:string,
    lastName:string
}

const userSchema:mongoose.Schema<IUser> = new mongoose.Schema({
    username:{type:String,required :true},
    password:{type:String,required :true},
    firstName:{type:String,required :true},
    lastName:{type:String,required :true},
})
const User:mongoose.Model<IUser>= mongoose.model<IUser>('User',userSchema)

interface IAccount extends mongoose.Document{
    userId:mongoose.Schema.Types.ObjectId,
    balance:number
}
const accountSchema:mongoose.Schema<IAccount>= new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    balance:{type:Number,required:true}
})
const Account:mongoose.Model<IAccount>=mongoose.model<IAccount>('Account',accountSchema)

export  {User,Account};