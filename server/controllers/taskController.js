const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');
exports.createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.json({ task });
    } catch (error) {
        console.log(error);
        res.status(500).send('Something is wrong');
    }
};
exports.getTasks = async (req, res) => {
    try {
        const { projectId } = req.query;
        // Get the tasks by project
        const tasks = await Task.find({ projectId: projectId }).sort({ $natural: -1 });
        res.json({ tasks });
    } catch (error) {
        console.log(error);
        res.status(500).send('Something is wrong');
    }
};
exports.updateTasks = async (req, res) => {
    try {
        const { name, state } = req.body;

        // Check if the task exists
        let task = await Task.findById(req.params.id);
        if (!task) res.status(400).json({ msg: 'Task not found' });

        const newTask = {};
        newTask.name = name;
        newTask.state = state;

        // update the task
        task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, { new: true });
        res.json({ task });
    } catch (error) {
        console.log(error);
    }
};
exports.deleteTasks = async (req, res) => {
    try {
        // Check if the task exists
        let task = await Task.findById(req.params.id);
        if (!task) res.status(400).json({ msg: 'Task not found' });

        // delete the task
        await Task.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Task deleted' });
    } catch (error) {
        console.log(error);
    }
};
