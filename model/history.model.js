const mongoose = require('mongoose'); 
const boardistoy = mongoose.model('boardistoy',{

date:{type:String},
backlog:{type:Number}, 
inprogress:{type:Number} ,
completed:{type:Number},
inhold:{type:Number}



}) 


module.exports = boardistoy ; 