import express from 'express'
import { upload } from '../upload.js';
import { addPost,getPosts,editPost,deletePost,getImageById } from '../Controllers/postController.js';
import passport from '..//autherization/passport.js'

const postRouter = express.Router();

postRouter.post('/addpost',passport.authenticate('jwt' , { session: false }),
                        upload.single('image'),addPost)
postRouter.get('/getposts',getPosts)
postRouter.patch('/editpost/:id',editPost)
postRouter.delete('/deletepost/:id', deletePost)
postRouter.get('/images/:id',getImageById)

export default postRouter