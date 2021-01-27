const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name:{
        type: String,
        required: true,
    },
    age: Number,
    email : String
});

module.exports = mongoose.model ('user', userSchema)