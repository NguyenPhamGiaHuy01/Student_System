import User from './../models/user.js'
import bcrypt from 'bcrypt'
async function addUser(userModel){
  
  const saltRounds = 10; // Adjust cost factor as needed (higher for more security)
  const salt = await bcrypt.genSalt(saltRounds);

  // 3. Hash the password using the salt
  const hashedPassword = await bcrypt.hash(userModel.password, salt);
    debugger
    //todo
    let user = new User({
        ...userModel,
        password: hashedPassword
    });
    debugger
    await user.save();
    debugger
    return user.toObject();
}
async function getUsers(){
    const users = await User.find();
    return users.map(x=>x.toObject())
}

async function getUser(id){
    const user = await User.findById(id);
    return user.toObject()
}

async function updataUser(id, userModel){
    debugger
    
    const user = await User.findByIdAndUpdate(id, userModel);
    return user.toObject()
}

async function deleteUser(id){
    await User.findByIdAndDelete(id)
}
export {addUser, getUsers, getUser, updataUser, deleteUser}