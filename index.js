const express = require('express')
const cookieParser=require('cookie-parser')
const bodyParser = require('body-parser')
const moment = require('moment')
const app = express();
const formResult =[];
const users=[]
app.use(cookieParser());
app.use(bodyParser.json())

app.get('/', setCookieTime,(req, res) => {
    res.send(`Hello world ${req.cookies.timeStamp}`) 
})


app.get('/myroute/:param',(req,res)=>{
    res.json( {
        headers :req.headers,
        params :req.params,
        cookies: req.cookies
    })
})

app.get('/form',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.post('/form',(req,res)=>{
    formResult.push(req.body)
    res.redirect('/result')
    res.send("Created")
})

app.get('/result',(req,res)=>{
    res.send(formResult)
})

app.get('/api/time',(req,res)=>{
    res.json({
       time: moment(Date.now()).format('DD/MM/YYYY HH:mm:ss')
    })
})

app.post('/api/users',(req,res)=>{
    if(typeof req.body.userName!=='string' && typeof req.body.gender!=='string' 
    && typeof req.body.gender!=='bool' && typeof req.body.password!=='string'){
            res.status(424).send("Data type is not correct")
    }else{
        users.push(req.body)
        res.send('User created')
    }
})

app.get('/api/users',(req,res)=>{
    res.json(users)
})


function setCookieTime(req, res, next) {
    if(!req.cookies.timeStamp){
        res.cookie('timeStamp',Date.now())
    }
    next()
}

app.listen(3000,err=>{
    if(err){
        console.log(err)
    }
    })