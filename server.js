var express = require('express')
var cors = require('cors')
const fs  = require('fs')
const bodyParser = require('body-parser')
const app = express();
const todos = []
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json(todos)
  })

app.post('/',(req, res, next) => {
    if(req.body.text !== "") {
        todos.push(req.body)
        console.log(todos)
        res.redirect('/')
    }
})

app.delete('/:id',(req,res)=>{
    const del = todos.filter((todo)=>todo.id!==req.params)
    console.log(req)
    res.render('index.pug',{todos:del})
})


app.listen(3000,err=>{
    if(err){
        console.log(err)
    }
})