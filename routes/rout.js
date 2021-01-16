const { request } = require("express");
const express = require("express");
const router = express.Router();
const Posts = require("../modal/posts");


// to get all posts
router.get("/",(req,res)=>{

    Posts.find()
    .then((resp) =>  res.status(200).json(resp))
    .catch((err) => res.status(400).json("request failed"));
});

// to create a new post
router.post("/",(req,res) => {

    const {title, description} = req.body;
    const post = new Posts({
        title,
        description,
    });
    post
    .save()
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(400).json("request failed"));
});

// to delete a specific post
router.delete("/:id",(req,res)=>{
    Posts.deleteOne({_id:req.params.id})
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(400).json("request failed"));
});

// to update a specific post
router.patch("/:id",(req,res)=>{
    Posts.updateOne({_id:req.params.id},{$set:req.body})
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(400).json("request failed"));
});

// to delete multiple posts
router.post("/delete",(req,res)=>{
    const ids = req.body.ids
    Posts.deleteMany({_id:{$in:ids}})
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(400).json("request failed"));
    
});


module.exports = router;