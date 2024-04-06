const Client = require('../model/client.model'); 
const mongoose  = require('mongoose') ; 



//create client 
const createClient = async (req, res ) => {
let data = req.body ; 
let clientexist = true ; 
 const imageuploaded = req.file ? req.file.filename : null;
const clientExists = await Client.findOne({ email:data.email });

if (clientExists) {
    console.log('Client exists!');
    res.status(400).send('Client exist');
} else {
    console.log('Client does not exist!');
     try {
        const client = new Client({...data , 
             image:imageuploaded,
             date : new Date()
            });
        await client.save();
        res.status(200).send(client);
    } catch (error) {
        res.status(400).send(error);
    }
}
   
};

// Get all clients
const getClients = async (req, res) => {
    try {
        const clients = await Client.find({});
        res.send(clients);
    } catch (error) {
        res.status(500).send();
    }
};

// Get client by ID
const getClientById = async (req, res) => {
    const _id = req.params.id;

    try {
        const client = await Client.findById(_id);
        if (!client) {
            return res.status(404).send('client not found');
        }
        res.send(client);
    } catch (error) {
        res.status(500).send('find client byId server error');
    }
};

// Update client by ID
const updateClientById = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['fullname', 'email', 'address','tel', 'image', 'date'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!client) {
            return res.status(404).send();
        }
        res.send(client);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete client by ID
const deleteClientById = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            return res.status(404).send();
        }
        res.send(client);
    } catch (error) {
        res.status(500).send();
    }
};

module.exports = {
    
  createClient,
  deleteClientById,
  updateClientById,
  getClientById,
  getClients
};
