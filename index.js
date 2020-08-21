const path = require('path')
const { config, engine } = require('express-edge');
const express = require('express')
const app = new express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./database/models/Users');
const { response } = require('express');
const { resourceUsage } = require('process');
const { Console } = require('console');
const { update } = require('./database/models/Users');
const { runInNewContext } = require('vm');

mongoose.connect('mongodb://localhost:27017/ObjectivesDataBase', { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true })

// app.get('/',(request, response)=>{
// response.json({
//     name: 'Fernando Ramos'
// });
// }) 

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(engine);

app.set('views', `${__dirname}/views`);

app.get('/', async (req, res)=>{
    const users = await User.find({});

    res.render('index', {
        users}
        )
    })

app.get('/user/:id?', async (req, res)=>{
    const id = req.params.id;
    if (id == '0'){
        res.render('user',{user:{_id:'',Id:'', Nombre:''}});
    }
    else{
        const user = await User.findById(id);
        res.render('user', {user});
    }
})

app.post('/user/new', async (req, res)=>{
     const user = req.body;
     
    if(user._id == 0){
        user._id =null;
        User.create(user,(err, user )=>{
            console.log(err, user)
        })
        res.redirect('/');
    }
    else{
        User.findByIdAndUpdate(user._id,{
            Nombre: user.Nombre
        },(err, res)=>{
            console.log(err, user)
        })
        res.redirect('/');
    }
})

app.get('/user/delete/:id', (req, res)=> {
    const id = req.params.id;
    User.findByIdAndRemove(id,(err, res)=>{
    console.log(err, res)
    })
    res.redirect('/');
})

app.listen(3000, ()=>{
    console.log('The App listening in port 3000')
})