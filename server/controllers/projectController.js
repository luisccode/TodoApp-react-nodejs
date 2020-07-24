const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const project = new Project(req.body);
        project.owner = req.user.id;
        project.save();
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).send('Something is wrong');
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user.id });
        res.json({ projects });
    } catch (error) {
        console.log(error);
        res.status(500).send('Something is wrong');
    }
};

exports.updateProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const newProject = {};

    if (name) {
        newProject.name = name;
    }

    try {
        let project = await Project.findById(req.params.id);
        // Check if the projecr exists
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        // check if the current user is owner of the project
        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        //update the project
        project = await Project.findOneAndUpdate(
            { _id: req.params.id },
            { $set: newProject },
            { new: true }
        );
        res.json({ project });
    } catch (error) {
        console.log(error);
        res.status(500).send('Something is wrong...');
    }
};

exports.deleteProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        // Check if the projecr exists
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        // check if the current user is owner of the project
        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        //delete the project
        await Project.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Project deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).send('something is wrong');
    }
};
