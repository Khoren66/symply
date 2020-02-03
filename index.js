const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express();
const todos = []
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.engine('pug', require('pug').__express)

app.set('views',path.join(__dirname,'views'))
app.set('view engine','pug');


app.get('/',(req, res) => {
    res.render('index.pug',{todos:todos})
})

app.post('/',(req, res) => {
    if(req.body.todo!==""){
        const newTodo ={
            id:Date.now(),
            todo:req.body.todo
        }
        todos.push(newTodo)
        res.render('index.pug',{todos:todos})
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