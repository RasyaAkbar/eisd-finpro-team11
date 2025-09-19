const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/rbac.middleware');


router.get('/:id', 
    authenticate,         
    authorize(['user', 'admin']),
    userController.findOne);
router.put('/:id', 
    authenticate,         
    authorize(['user', 'admin']),
    userController.update);
router.delete('/:id',
    authenticate,         // 1. Apakah pengguna sudah login?
    authorize(['user', 'admin']), // 2. Apakah pengguna memiliki peran 'admin'?
    userController.delete);

module.exports = router;