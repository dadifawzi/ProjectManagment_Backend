const mongoose = require('mongoose') ; 
const Client = mongoose.model('Client',{
    fullname:{
        type:String
    },
    email:{
        type:String
    },
    adress:{
        type:String
    },
    tel:{
        type:String
    },
    image:{
        type:String
    },
    date:{
        type:String
    }

})

module.exports = Client ;
