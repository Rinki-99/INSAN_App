const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const groupeController = require('../controllers/groupe.controller');

// Groupe List
router.get('/', groupeController.getGroupeList);

//create new groupe
router.post('/', groupeController.createNewGroupe);

//get groupe by id
router.get('/:id',groupeController.getGroupeByID);

//delete groupe by id
router.delete('/:id',groupeController.deleteGroupe);

// get membres by groupe ID
router.get('/membres/:id', groupeController.getMembresByGroupeID);

module.exports = router;