const Project = require('../models/Project');
const { validationResult } = require('express-validator');

module.exports = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // the projectId can be pass by req.body or req.query
        const projectId = req.body.projectId || req.query.projectId;
        const project = await Project.findById(projectId);
        // Check if the project exists
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        // check if the current user is owner of the project
        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send('Something is wrong');
    }
};
