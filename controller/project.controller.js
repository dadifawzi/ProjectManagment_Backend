const project = require("../model/project.model");
const mongoose = require("mongoose");
const { createBoard , deleteBoard } = require('./board.controller');

//fs used to delete files 
const fs = require('fs');

// path used to get absolute path 
const path = require("path");


const create = async (req, res, filenames) => {
  try {
    let data = req.body;
    let pr = new project(data);
    pr.files = filenames;
    pr.date = new Date();

    pr.team = JSON.parse(data.team);

    let result = await pr.save();

     createBoard(result._id);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("save project controller error " + error);
  }
};

const update = async (req, res, filenames) => {
  try {
    let data = req.body;
    let id = req.params.id;

    if (filenames.length > 0) {
      data.files = filenames;
    }

    data.team = JSON.parse(data.team);

    let updatedProject = await project.findByIdAndUpdate({ _id: id }, data);
    res.status(200).send(updatedProject);
  } catch (e) {
    res.status(500).send("update project error" + e);
  }
};

const getAll = async (req, res) => {
  try {
    let projects = await project
      .find()
      .populate({
        path: "client",
        model: "Client",
      })
      .populate({
        path: "team",
        model: "User",
      })
      .exec();

    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send("get all projects error : " + error);
  }
};

const getById = async (req, res) => {
  try {
    let id = req.params.id;
    let p = await project
      .findById(id)
      .populate({
        path: "client",
        model: "Client",
      })
      .populate({
        path: "team",
        model: "User",
      })
      .exec();
    res.status(200).send(p);
  } catch (error) {
    res.status(500).send("project getById error " + error);
  }
};

const deleteProject = async (req, res) => {
  try {
    let id = req.params.id;
    console.log("start delete id is : " + id);
    // Extract filenames of project files
   await project.findById(id).then((result) =>  {
      console.log("find project by id is : " + result);
      // Extract filenames of project files
      let filenames = [];
      filenames = result.files;
      //the absolute path of server.js
      const projectPath = path.resolve(__dirname, "..");
      const projectDocPath = path.join(projectPath, "projectDoc");

      try {
        filenames.forEach((element) => {
          console.log(element);
          fs.unlink(projectDocPath + "/" + element, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log("File deleted successfully");
            }
          });
        });
      } catch (e) {
        console.log(e);
      }
    });




     project.findOneAndDelete({ _id: id })
     .then((result)=>{
          deleteBoard(id);
          res.status(200).send(result);
     }).catch((err)=>{
       res.status(500).send("project delete by id error : " + err)
     });

    
  } catch (error) {
   console.log(error);
  }
};

module.exports = {
  create,
  update,
  getAll,
  getById,
  deleteProject,
};
