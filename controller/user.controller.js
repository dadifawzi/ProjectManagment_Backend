const User = require('../model/user.model'); 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


//create admin account
const createAdminAccount = async()=>{

let admin ={
    fullname : process.env.fullname,
    email : process.env.email,
    password:process.env.password,
    tel:process.env.tel,
    image:process.env.image,
    role:process.env.role,
    date:new Date()
}

let adminExist = await User.findOne({role:'admin'}) ; 
if(adminExist){
console.log('admin exist'); 
}
else{
console.log('admin does not exist!');
     try {
    const hashedpassword = await bcrypt.hash(admin.password,10)
        let user = new User({...admin , 
             password:hashedpassword ,
            });
        await user.save();
        
        
    } catch (error) {
        console.log(error);
    }
}



};


//SignIn 
const signIn = async (req, res) => {
    try {
        console.log('signin fuction user ');
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ _id: user._id.toString() },process.env.SECRET_KEY);
        res.send({ user, token });
    } catch (error) {
        res.status(500).send();
    }
};


// Create a new user
const createUser = async (req, res ) => {
let data = req.body ; 
let userexist = true ; 
 const imageuploaded = req.file ? req.file.filename : null;
const userExists = await User.findOne({ email:data.email });

if (userExists) {
    console.log('User exists!');
    res.status(400).send('user exist');
} else {
    console.log('User does not exist!');
     try {
    const hashedpassword = await bcrypt.hash(data.password,10); 
    const tags =JSON.parse(data.tags) ; 
        const user = new User({...data , 
             password:hashedpassword ,
             role:'user',
             image:imageuploaded,
             tags:tags,
             date : new Date()
            });
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}
   
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send();
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
};

// Update user by ID
const updateUserById = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['fullname', 'email', 'password', 'tel', 'image', 'tags', 'date', 'role'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete user by ID
const deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
};

module.exports = {
    signIn,
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    createAdminAccount
};
