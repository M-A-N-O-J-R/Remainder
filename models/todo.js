const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const todoSchema=new Schema(
{
    task: 
    {
        type:'string',
        required: true

    },
    deadline:
    {
        type:'Date',
        required: true
    },
    info:
    {
        type:'string',
        required: true
    }
},{timestamps:true});

const Todo = mongoose.model('todo',todoSchema);

module.exports = Todo;