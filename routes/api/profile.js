const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load validation
const validateProfileInput = require('../../validator/profile');
//experience validation
const validateExperienceInput = require('../../validator/experience');
//education field validation
const validateeducationInput = require('../../validator/education');

//load profile model
const Profile = require('../../model/Profile');
//load user model
const User = require('../../Model/User');


//route GET api/profile/text
//desc Tests users route
//@access Public
router.get('/test', (req,res) => res.json({msg: 'hello from profile test'}));

//route GET api/profile
//desc get current user's profile
//@access private

router.get('/', passport.authenticate('jwt', {session: false}), (req,res)=>{
    const errors = {};
    //fine user with the id
    Profile.findOne({user: req.user.id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = "There is no profile for this user";
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
})

//route GET api/profile/handle/:handle
// desc Get profile by handle
//@access public

router.get('/handle/:handle', (req,res) => {
    const errors = {};
    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
            .then(profile => {
                if(!profile){
                    errors.noprofile = 'There is not profile for this user';
                    res.status(404).json(errors);
                }

                res.json(profile)
            })
            .catch(err => res.status(404).json(err));
})

//route GET api/profile/handle/:handle
// desc Get profile by handle
//@access public

router.get('/handle/:handle', (req,res) => {
    const errors = {};
    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
            .then(profile => {
                if(!profile){
                    errors.noprofile = 'There is not profile for this user';
                    res.status(404).json(errors);
                }

                res.json(profile)
            })
            .catch(err => res.status(404).json({profile: 'there is no such profile'}));
})

//route GET api/profile/user/:user_id
// desc Get profile by user id
//@access public

router.get('/user/:user_id', (req,res) => {
    const errors = {};
    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
            .then(profile => {
                if(!profile){
                    errors.noprofile = 'There is not profile for this user';
                    res.status(404).json(errors);
                }

                res.json(profile)
            })
            .catch(err => res.status(404).json({profile: 'There is no such profile'}));
})

//route GET api/profile/all
// desc Get all profiles from mongodb
//@access public

router.get('/all', (req,res)=>{
    const errors = {};
    Profile.find()
        .populate('users', ['name', 'email'])
            .then(profiles =>{
                if(!profiles){
                    errors.noprofile = "No profile found";
                    return res.status(404).json(errors);
                }
                    
                    res.json(profiles);
            })
            .catch(err => res.status(404).json(err));
})



//route POST api/profile
// Create User Profile
//@access private

router.post('/', passport.authenticate('jwt', {session: false}), 
(req,res) => {
    //validate the form submission
    const { errors, isValid } = validateProfileInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    //Get fields
    
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    //skills - splite the comma separated value into array
    if(typeof req.body.skills !== 'undefined'){
        profileFields.skills = req.body.skills.split(',');
    }

    //social links
    profileFields.social = {};
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({user: req.user.id})
        .then(profile => {
            if(profile){
                //update profile
                Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileFields },
                    { new: true }
                )
                .then(profile => res.json(profile));
            } else {
                //create

                //check if handle exists
                Profile.findOne({ handle: profileFields.handle }).then( profile => {
                    if(profile){
                        errors.handle = 'That handle already exists';
                        res.status(400).json(errors);
                    }
                    //save profile if not found
                    new Profile(profileFields).save().then(profile => res.json(profile))
                })
            }
        })
})

//route POST api/profile/experience
// add experience to profile
//@access private

router.post('/experience', passport.authenticate('jwt', {session: false}), (req,res)=>{
    const { errors, isValid } = validateExperienceInput(req.body);
    if(!isValid){
        return res.status(404).json(errors);
    }
    Profile.findOne({user: req.user.id})
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            //add to experience array

            profile.experience.unshift(newExp);
            profile.save().then(profile => res.json(profile))
        })
})

//route POST api/profile/education
// add education to profile
//@access private

router.post('/education', passport.authenticate('jwt', {session: false}), (req,res)=>{
    const { errors, isValid } = validateeducationInput(req.body);
    if(!isValid){
        return res.status(404).json(errors);
    }
    Profile.findOne({user: req.user.id})
        .then(profile => {
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                major: req.body.major,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            //add to education array

            profile.education.unshift(newEdu);
            profile.save().then(profile => res.json(profile))
        })
})

//route DELETE api/profile/experience/:exp_id
// delete experience from profile
//@access private

router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req,res)=>{
    
    Profile.findOne({user: req.user.id})
        .then(profile => {
           const removeIndex = profile.experience
                .map(item => item.id)
                    .indexOf(req.params.exp_id);
            profile.experience.splice(removeIndex,1);

            profile.save().then(profile => res.json(profile));
           
        })
        .catch(err => res.status(404).json(err));
})

//route DELETE api/profile/education/:exp_id
// add education to profile
//@access private

router.delete('/education/:exp_id', passport.authenticate('jwt', {session: false}), (req,res)=>{
    
    Profile.findOne({user: req.user.id})
        .then(profile => {
           const removeIndex = profile.education
                .map(item => item.id)
                    .indexOf(req.params.exp_id);
            profile.education.splice(removeIndex,1);

            profile.save().then(profile => res.json(profile));
           
        })
        .catch(err => res.status(404).json(err));
})

//route DELETE api/profile
// add delete user and profile and user from the database
//@access private

router.delete('/', passport.authenticate('jwt', {session: false}), (req,res)=>{
    Profile.findOneAndRemove({ user: req.user.id })
        .then(()=>{
            User.findOneAndRemove({ _id: req.user.id })
                .then(()=> res.json({success: true})).catch(err => res.status(400).json(err));
        }).catch(err => res.status(400).json(err));
})

module.exports = router