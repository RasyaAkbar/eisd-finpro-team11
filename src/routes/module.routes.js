const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/module.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/rbac.middleware');

// Get all modules
router.get('/',
    authenticate,         
    moduleController.findAll);

// Get one module by ID
router.get('/:id',
    authenticate, 
    moduleController.findOne);

// Create a new module
router.post('/', 
    authenticate,         
    authorize(['admin']),
    moduleController.create);

// Update a module
router.put('/:id', 
    authenticate,         
    authorize(['admin']),
    moduleController.update);

// Delete a module
router.delete('/:id', 
    authenticate,         
    authorize(['admin']),
    moduleController.delete);

module.exports = router;