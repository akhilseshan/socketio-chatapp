 const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema for storing user details
const userSchema = new Schema({
    uId:{
        type:String,
        required:true,
    },
    name: {
        type:String,
        required:true
    },
    emailId:{
        type: String,
        required:true
    },
    creationDate:{
        type:Date,
        required:true
    },
    photoUrl:{
        type:String
    }
});

const User = mongoose.model('user',userSchema);

module.exports = User;