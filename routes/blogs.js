const {uuid} = require('uuidv4');
const express = require('express');
const router = express.Router();

const {db} = require('../mongo');

router.get('/get-one-example', async (req, res, next)=>{
    const blogPost = await db().collection("posts").findOne({
        id: {
            $exists: true
        }
    })
    res.json({
        success: true,
        post: blogPost
    })
})

module.exports = router;