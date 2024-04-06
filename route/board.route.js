const express = require('express');

const router = express.Router();

const { byId, deleteBoard, update } = require('../controller/board.controller');


router.get('/byid/:id', byId);
router.delete('/delete/:id', deleteBoard);
router.put('/update/:id', update);



module.exports = router;