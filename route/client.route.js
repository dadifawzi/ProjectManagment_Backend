const clientController = require('../controller/client.controller') ;
const multer = require('multer'); 
const verifyToken = require('../config/auth/authMiddleWare');

const express = require('express') ; 
const router = express.Router() ; 


let fileName ='' ; 

//set Storage engine
const storage = multer.diskStorage({
destination:'./storage',
filename:function(req,file,redirect){
    fileName = file.originalname.split('.')[0] +'-'+ Date.now() +'.'+ file.mimetype.split('/')[1];
    redirect(null,fileName); 
}
}); 

//upload function
const upload = multer({
    storage:storage
})





// Routes for client management
router.post('/add',upload.single('image') ,(req,res)=>{ clientController.createClient(req,res,fileName) ; fileName='' ; });
router.get('/all',clientController.getClients );
router.get('/:id',clientController.getClientById );
router.put('/:id',upload.single('image') , (req,res)=>{ clientController.updateClientById(req,res,fileName)  ; fileName='' ; });
router.delete('/:id',clientController.deleteClientById );


module.exports = router;






