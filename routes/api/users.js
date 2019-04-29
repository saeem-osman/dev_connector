const express = require('express');
const router = express.Router();

//route GET api/users/text
//desc Tests users route
//@access Public
router.get('/test', (req,res) => res.json({msg: 'hello from users test'}));

module.exports = router