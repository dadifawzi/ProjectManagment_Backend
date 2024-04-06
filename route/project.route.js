const projectController = require('../controller/project.controller') ;
//used for multiple files upload for project 
const multer  = require('multer'); 
const express = require('express') ; 
const router = express.Router(); 
const verifyToken = require('../config/auth/authMiddleWare.js');



 let filenames = []; // Array to store filenames

// Set storage engine
const storage = multer.diskStorage({
    destination: './projectDoc',
    filename: function(req, file, redirect) {
        const fileName = file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.mimetype.split('/')[1];
        filenames.push(fileName); // Push filename to the array
        redirect(null, fileName);
    }
});

// Initialize upload (for multiple files)
const upload = multer({
    storage: storage
}).array('files',10); // 'files' is the name attribute of the file input field in the HTML form, 5 is the maximum number of files allowed


router.post('/create',verifyToken, (req, res) => {
    upload(req, res, function(err) {
        if (err) {
            // Handle upload error
            console.error('Upload error:', err);
            return res.status(400).send('Upload failed');
        } else {
            // Successfully uploaded files
            console.log('Uploaded filenames:', req.files.map(file => file.filename));
            
            // Call your function or perform any other action here
            projectController.create(req, res, filenames);
            filenames = [];
        }
    });
});


router.put('/update/:id', (req, res) => {
    upload(req, res, function(err) {
        if (err) {
            // Handle upload error
            console.error('Upload error:', err);
            return res.status(400).send('Upload failed');
        } else {
            // Successfully uploaded files
            console.log('Uploaded filenames:', req.files.map(file => file.filename));
            
            // Call your function or perform any other action here
            projectController.update(req, res, filenames);
            filenames = [];
        }
    });
});







router.get('/id/:id',projectController.getById); 
router.get('/all',projectController.getAll);
router.delete('/:id',projectController.deleteProject); 






module.exports = router ; 