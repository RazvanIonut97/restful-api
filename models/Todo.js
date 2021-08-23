const mongoose=require('mongoose');
const TodoSchema= new mongoose.Schema({
    isDone:{
        type:Boolean,
        default:false},
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    position:{
        type:Number,
        default:1
    },
    

});

module.exports=mongoose.model('Todo',TodoSchema);