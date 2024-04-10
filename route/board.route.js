const express = require('express');

const router = express.Router();

const { byId, deleteBoard, update , getall , gethistory} = require('../controller/board.controller');


router.get('/byid/:id', byId);
router.delete('/delete/:id', deleteBoard);
router.put('/update/:id', update);
router.get('/',getall) ;
router.get('/history' , gethistory) ;  


module.exports = router;