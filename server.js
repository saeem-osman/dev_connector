const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//apis
const users = require('./routes/api/users')
const post = require('./routes/api/post')
const profile = require('./routes/api/profile')

const db = require('./config/keys').mongoURI;
mongoose.connect(db, {useNewUrlParser: true}).then(()=>console.log('MongoDB connected')).catch(err=>console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

//USE Routes
app.use('/api/users', users);
app.use('/api/post', post);
app.use('/api/profile', profile);


const port = process.env.PORT || 8000;

app.listen(port, ()=> console.log(`Server running on ${port}`));