const projectController = require('../controller/project.controller') ;
//used for multiple files upload for project 
const multer  = require('multer'); 
const express = require('express') ; 
const router = express.Router(); 
const verifyToken = require('../config/auth/authMiddleWare.js');



 let filenames = []; // Array to store filenames

// Set storage engine

   filenames = [];
const  storage = multer.diskStorage({
    destination: './projectDoc',
    filename: (req, file, redirect)=>{
        fl = Date.now() + '.' + file.mimetype.split('/')[1]
        filenames.push(fl);
        redirect(null, fl);
    }
})

// Initialize upload (for multiple files)
const upload = multer({ storage: storage });



router.post('/', upload.any('files'), (req, res)=>{
    projectController.create(req, res, filenames);
    filenames = [];
} );

router.put('/:id', upload.any('files'), (req, res)=>{
    projectController.update(req, res, filenames);
    filenames = [];
} );



router.get('/:id',projectController.getById); 
router.get('/',projectController.getAll);
router.delete('/:id',projectController.deleteProject); 






module.exports = router ; 