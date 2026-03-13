const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const createUser = async (req,res)=>{

  try{

    const {name,email,password,role} = req.body;

    if(role === "ADMIN"){
      return res.status(403).json({
        message:"Cannot create admin"
      });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await userModel.createUser({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.json(user);

  }catch(error){
    res.status(500).json({message:"Error creating user"});
  }

};

const getUsers = async (req,res)=>{

  const users = await userModel.getUsers();

  res.json(users);

};

const deleteUser = async (req,res)=>{

  await userModel.deleteUser(req.params.id);

  res.json({message:"User deleted"});

};

module.exports = {
  createUser,
  getUsers,
  deleteUser
};