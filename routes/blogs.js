const {v4} = require('uuid');
const express = require('express');
const router = express.Router();

const {db} = require('../mongo');
const {ObjectId, ObjectID} = require("mongodb");
const validateBlog = require('../validation/blog');

router.get('/get-one-example', async (req, res, next) => {
    const blogPost = await db().collection("posts").findOne({
        _id: {
            $exists: true
        }
    })
    res.json({
        success: true,
        post: blogPost
    })
})
router.get('/get-one/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const blogPost = await db().collection("posts").findOne({
            _id: ObjectId(req.params.id)
        });
        if (blogPost === null || blogPost === undefined) {
            return res.json({
                success: false,
                message: "This post does not exist"
            })
        }
        return res.json({
            success: true,
            post: blogPost
        })
    } catch (error) {
        return res.json({success: false, message: error.toString()});
    }
})
router.post("/create-one", (req, res, next) => {


    try {
        const newPost = {
            _id: ObjectId(32),
            createdAt: Date.now(),
            lastModified: Date.now(),
            ...req.body
        }
        const validation = validateBlog(newPost);
        console.log(validation);
        if (validation.isValid === false) {
            return res.json({
                success: false,
                errors: validation.errors
            })
        }else{
            db().collection("posts").insert(newPost).then(post => {
                res.json({
                    success: true,
                    post: post
                })
            }).catch(error => {
                res.json({
                    success: false,
                    message: error.toString()
                })
            })
        }


    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.toString()
        })
    }

})
router.put("/update-one/:id", (req, res, next) => {
    const updatedPost = {
        ...req.body,
        lastModified: Date.now()
    }
    db().collection("posts").updateOne({_id: ObjectId(req.params.id)}, {$set: {...updatedPost}}).then(post => {
        res.json({
            success: true,
            post: post
        })
    }).catch(error => {
        res.json({
            success: false,
            message: error.message
        })
    })
})
module.exports = router;