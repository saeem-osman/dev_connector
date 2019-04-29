const express = require('express');
const mongoose = require('mongoose');
const app = express();

//apis
const users = require('./routes/api/users')
const post = require('./routes/api/post')
const profile = require('./routes/api/profile')

const db = require('./config/keys').mongoURI;
mongoose.connect(db, {useNewUrlParser: true}).then(()=>console.log('MongoDB connected')).catch(err=>console.log(err));

app.get('/', (req,res)=> res.send("tujhko pehchan lu main hooo don...."));

//USE Routes
app.use('/api/users', users);
app.use('/api/post', post);
app.use('/api/profile', profile);


const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server running on ${port}`));