const express = require('express');
const router = express.Router();

//route GET api/profile/text
//desc Tests users route
//@access Public
router.get('/test', (req,res) => res.json({msg: 'hello from profile test'}));

module.exports = router