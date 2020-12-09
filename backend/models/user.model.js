const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name : {
        type: String,
        //required: true
    },
    phone : { 
        type: String,
        //required: true 
    },
    days: {
        type: Number,
    },
    dates : {
        type: [String]
    },
    amtToPay : {
        type: String,
    },
    isPaid : {
        type: Boolean,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;