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
export default User;