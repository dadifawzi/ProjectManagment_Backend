const mongoose = require('mongoose'); 
const Project = mongoose.model('Project',{
    name:{type:String},
    description:{type:String},
    startDate:{type:Date, default :0},
    endDate:{type:Date, default :0},
    files:{type:Array , default:[]},
    date:{type:Date},
    budget:{type:Number},
    client:{type:mongoose.Types.ObjectId,ref:'Client' , default:null},
    status:{type:String},
    team:{type:[{type:mongoose.Types.ObjectId , ref:'User'}] , default : null }
})


module.exports  = Project ;  