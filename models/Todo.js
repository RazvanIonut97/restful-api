const mongoose=require('mongoose');

const TodoSchema=mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    position:{
        type:Number,
        require:true
    }
});
module.exports=mongoose.model('Todos',TodoSchema);