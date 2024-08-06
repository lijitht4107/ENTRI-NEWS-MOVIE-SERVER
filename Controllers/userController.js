import User from "../models/userModels.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const addUser = async (req,res) =>{
    try {
        const saltRounds = 12;
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            if (err) {
                res.status(500).json({error:"Internal server error"})
            }
            var userItem = {
                username: req.body.userName,
                email: req.body.email,
                genter: req.body.genter,
                age: req.body.age,
                password: hash,
                createdAt:new Date()
          }
          var user = new User(userItem)
          await user.save()
          if (!user) {
            res.status(404).json({error:"Fail to add user"})
          } else {
            res.status(201).json({message:"signup successfull"})
          }
          });
        
    } catch (error) {
        console.log();
        res.status(500).json({error:"Internal server error"})
    }
    
}

const login = async (req,res) => {
    console.log(req.body);
    try {
        const { email, password} =req.body;
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(401).json({message:'user not found'})
        }
        const isValied =await bcrypt.compare(password,user.password)
        console.log(isValied);
        if(!isValied){
            return res.status(401).json({message:'invalied credentials'})
        }
    let payload = {user:email,pwd:password}
    let token = jwt.sign(payload,process.env.SECRET_KEY)

        res.status(200).json({message:"Login successfull",token:token})
    } catch (error) {
        console.log();
        res.status(500).json({error:"Internal server error"})
    }
}

const getUsers = async (req,res) =>{
    try {
        
        const users = await User.find({})
        if(!users){
            res.status(404).json({error:"cannot find users"})
        }
        
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})

        
    }
}
const getUserByUserName = async(req,res) =>{

    try {
        const user = await User.findOne({username:req.params.username}).exec();
        if (!user) {
            res.status(404).json({error:"user not found"})
            
        } else {
            res.status(200).json(user)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"}) 
    }
}
const updateUserById = async (req,res)=>{
try {
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if (!user) {
        res.status(404).json({error:"user not found"})
    } else {
        res.status(200).json(user)
    }
} catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal server error"})
}
}
const deleteUserById=async(req,res)=>{
    try {
        const user =await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(404).json({error:"User not found"})
        }else{
            res.status(200).json({message:"deleted successfully"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
}
export{getUsers,getUserByUserName,addUser,login,updateUserById,deleteUserById} 