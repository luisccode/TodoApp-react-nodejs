const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const projectVerification = require('../middleware/projectVefication');
const { check } = require('express-validator');

router.post(
    '/',
    auth,
    [
        check('name', 'The name is required').not().isEmpty(),
        check('projectId', 'The projectId is required').not().isEmpty(),
    ],
    projectVerification,
    taskController.createTask
);
router.get(
    '/',
    auth,
    [check('projectId', 'The projectId is required').not().isEmpty()],
    projectVerification,
    taskController.getTasks
);
router.put(
    '/:id',
    auth,
    [check('projectId', 'The projectId is required').not().isEmpty()],
    projectVerification,
    taskController.updateTasks
);
router.delete(
    '/:id',
    auth,
    [check('projectId', 'The projectId is required').not().isEmpty()],
    projectVerification,
    taskController.deleteTasks
);
module.exports = router;
