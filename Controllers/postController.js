import Post from '../models/postModels.js'
import path from 'path';
import fs from 'fs';

const addPost = async(req,res)=>{

    try {
        console.log(req.file.filename);
        var postItem = {
            image : req.file.filename,
            title:req.body.title,
            subtitle:req.body.subtitle,
            desc:req.body.desc
        }
        if(!postItem){
            return res.send("data not clear")
        }
        var post = new Post(postItem)
        await post.save();
        post.imageUrl = `http://localhost:3000/uploads/${post.id}`
        await post.save()
        res.status(201).json(postItem)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Iternal server error"})
    }
}

const getPosts=async(req,res)=>{
    try {
        const posts = await Post.find();
        
        if(!posts){
            return res.status(200).json({error:"Posts not find"})
        }else {
            res.status(200).json(posts)
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Iternal server error"})
    }
}
const editPost =async (req,res)=>{
    try {
        const id =req.params.id
        if(!id){
            return res.status(404).json({error:"id not get"})
        }
        const postItem =await Post.findByIdAndUpdate(id,req.body,
            {new:true})
        res.status(200).json(postItem)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Iternal server error"})
    }
}
const deletePost =async(req,res)=>{
    try {
        const id = req.params.id
        if(!id){
            res.status(401).json({error:"id not get"})
        }
        await Post.findByIdAndDelete(id)
        res.status(200).json({message:" post deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Iternal server error"})
    }
}
const getImageById =async (req,res)=>{
    try {
        const id =req.params.id
        const post =await Post.findById(id).exec()
        if(!post){
            res.status(401).json({error:"post not found"})
        }
        const dirname = path.resolve()
        const imagePath = path.join(dirname,'uploads',post.image)
        console.log(imagePath);
        // if(!imagePath){
        //     res.status(401).json({error:"Image not get"})
        // }
        
        // if(imagePath){
        //     res.status(200).json(imagePath)
        // }
        if(!fs.existsSync(imagePath)){
            return res.status(401).json({error:"file not found"})
        }
        res.sendFile((imagePath))
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Iternal server error"})
    }
}
export {addPost,getPosts,editPost,deletePost,getImageById}