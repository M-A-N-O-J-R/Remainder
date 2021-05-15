const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan=require('morgan');

const dbURI="mongodb+srv://user1:1234@cluster0.u7qxm.mongodb.net/DBS?retryWrites=true&w=majority"

mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
    console.log("\n CONNECTION SUCCESS");
    app.listen(3000);
}).catch(err =>{console.log(err);});

const Todo= require('./models/todo');

app.use(morgan('dev'));
app.set('view engine','ejs');
app.use(express.static('files'));
app.use(express.urlencoded({extended:true}));

app.get('/todo/index',(req,res)=>
{
//     const data=
//     [{
//         task:'Mathmatics Exam',
//         deadline: '3/1/2015',
//         info:'more informationmore informationmore informationmore informationmore informationmore informationmore informationmore information'

//     },
//     {
//         task:'Chemistry Exam',
//         deadline: '3/1/2015',
//         info:'Chemistry Exam'

//     },
//     {
//         task:'Physics Exam',
//         deadline: '3/1/2015',
//         info:'Physics Exam'

//     }
// ];
    Todo.find().then(result=>{
        res.render('index',{title:'index',todos:result});
    })
    
});

app.get('/todo/new',(req,res)=>{
    res.render('new',{title:'new'});
});

app.post('/todo/new',(req,res)=>
{
    const todo= new Todo({
        task:req.body.task,
        deadline:req.body.deadline,
        info:req.body.info
    });
    todo.save().then(result=>{res.redirect('/todo/index')}).catch(err=>{console.log(err)});
    
});

app.delete('/todo/:id', (req,res)=>{
const id= req.params.id;
Todo.findByIdAndDelete(id).then(result=>
{
    res.json({
        redirect:'/todo/index'
    })
}).catch(err=>{console.log(err)});
});
app.use((req,res)=>
{
   res.status(404).send("404 Error");

});

