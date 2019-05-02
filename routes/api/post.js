const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passport = require('passport');
const abcd = require('../../Model/Profile');
//post model
const Post = require('../../Model/Post');
//profile model
const Profile = require('../../Model/Profile');


//post validation
const validatePostInput = require('../../validator/post');
//validate comment input
const validateCommentInput = require('../../validator/comment')

//route GET api/post/test
//desc Tests users route
//@access Public
router.get('/test', (req,res) => res.json({msg: 'hello from post test'}));

//rout Post api/post
//desc create post
//access private
router.post('/', passport.authenticate('jwt', {session: false}), (req,res)=>{
    const {errors, isValid} = validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    const newPost = new Post ({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
})

//route GET api/post
//desc get all post
//access public

router.get('/', (req,res)=>{
    Post.find()
        .sort({date: -1})
            .then(post => res.json(post))
                .catch(err => res.status(404).json({nopostFound: 'No post found'}));
})

//route GET api/post/:id
//desc get post by id
//access public

router.get('/:id', (req,res)=>{
    Post.findById(req.params.id)
        .then(post => res.json(post))
            .catch(err => res.status(404).json({nopostFoundForThisId: 'no post found for this id'}));
})

//route DELETE api/posts/:id
// desc delete post
//access private

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req,res)=>{
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if(post.user.toString() !== req.user.id){
                        return res.status(401).json({unauthorized: 'unauthorized user error'});
                    }
                    post.remove().then(()=>res.json({success: true}))
                }).catch(err => res.status(400).json({deleteError: 'Post not found'}));
        })
})

//route POST api/posts/like/:id
// desc like post
//access private

router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req,res) =>{
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length>0 ){
                        return res.status(400).json({likeError: 'You have liked already'});
                    }
                    post.likes.unshift({user: req.user.id})
                    post.save().then((post)=> res.json(post))
                }).catch(err => console.log(error));
        }).catch(error => res.status(404).json({likeError: 'post is not found'}));
})

//route POST api/post/unlike/:id
// desc unlike a post
//access private

router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req,res) =>{
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0 ){
                        return res.status(400).json({unlikeError: 'You are not allowed to unlike'});
                    }
                    const userIndex = post.likes.map(item => item.user.toString())
                        .indexOf(req.user.id);
                        post.likes.splice(userIndex,1);
                        post.save().then(post => res.json(post));
                }).catch(err => console.log(error));
        }).catch(error => res.status(404).json({likeError: 'post is not found'}));
})

//route POST api/post/comment/:id
// desc create comment to a post
//access private

router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req,res) =>{
    const { errors, isValid } = validateCommentInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    const newComment = ({
                        text: req.body.text,
                        user: req.user.id,
                        avatar: req.body.id,
                    })
                    post.comments.unshift(newComment);
                    post.save().then(post => res.json(post));
                    
                })
        }).catch(error => res.status(404).json({likeError: 'post is not found'}));
})

//route POST api/post/comment/:id/:comment_id
// desc delete comment from a post
//access private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req,res)=>{
    Post.findById(req.params.id)
        .then(post => {
            if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
                return res.status(404).json({deleteError: 'comment does not exists'});
            }
            //find the index of the comment
            const removeIndex = post.comments.map(item => item._id.toString())
                .indexOf(req.params.comment_id);
            post.comments.splice(removeIndex,1);
            post.save().then(post => res.json(post));
        }).catch(err => res.status(400).json({deleteError: 'can not delete comment'}));
})





module.exports = router