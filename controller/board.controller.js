const Board = require('../model/board.model');
 const verifyToken = require('../config/auth/authMiddleWare.js');
const History = require('../model/history.model.js') ; 


const createBoard = (id)=>{

 
    let board = new Board();
    board.project = id;
    board.date = new Date();

    board.save()
        .then(
            (result)=>{
               console.log('created');
            }
        )
        .catch(
            (err)=>{
               console.log(err);
            }
        )

}


const getall = async (req,res)=>{
     try {
        const boards = await Board.find({});
        res.status(200).send(boards);
    } catch (error) {
        res.status(500).send();
    }

}

const byId = (req, res)=>{
    let id = req.params.id;

    Board.findOne({ project: id })
        .then(
            (result)=>{
                res.send(result);
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )

}

const deleteBoard = (id)=>{

    Board.findOneAndDelete({ project: id })
        .then(
            (result)=>{
console.log('boad deleted');            }
        )
        .catch(
            (err)=>{
console.log('board not deleted ');            }
        )

}

const update = (req, res)=>{

    let data = req.body;
    let id = req.params.id;

    Board.findByIdAndUpdate({ _id: id } , data)
        .then(
            (result)=>{
                res.send(result);
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )
}



const gethistory= async(req,res)=>{

      try {
       let data =  History.find().then((result)=>{
            res.status(200).send(result);
        }).catch ((error)=> {
        res.status(500).send(error);
    } ) ; 

      }catch(err)  {console.log(err);}



}






module.exports = { createBoard, byId, deleteBoard, update , getall ,gethistory};