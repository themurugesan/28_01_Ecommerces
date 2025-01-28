const User=require("../models/user");
const bcrypt=require("bcrypt")


async function createUsers(userData) {
    
    const{name,email,password}=userData
    const hashedPassword=await bcrypt.hash(password,10)
    const createUsers= new User({
        name,
        email,
        password:hashedPassword,
        role:"customer"
    });

    const savedUser=await createUsers.save();
    return savedUser

}

module.exports={createUsers}