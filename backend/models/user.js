import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    address: String,
    password: String
});
const User= mongoose.model('users', userSchema)
export default User
