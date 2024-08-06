import express from 'express'
import {getUsers,getUserByUserName,addUser,login,updateUserById,deleteUserById} from "../Controllers/userController.js"

const userRouter =express.Router()

userRouter.get('/',getUsers)
userRouter.get('/username/:username',getUserByUserName)
userRouter.post('/addUser',addUser)
userRouter.post('/login',login)
userRouter.patch('/edituser/:id',updateUserById)
userRouter.delete('/deleteUser/:id',deleteUserById)



export default userRouter