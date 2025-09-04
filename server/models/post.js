const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
    createdAt:{
        type:date,
        default:Date.now
    },
    updatedAt:{
        type:date,
        default:Date.now
    }
})
module.exports = mongoose.model('Post',PostSchema)