const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const membreController = require('../controllers/membre.controller');

// Membres List
router.get('/', membreController.getMembreList);

// create new membre
router.post('/', membreController.createNewMembre);

//get membre by id
router.get('/:id',membreController.getMembreByID);

//delete membre by id
router.delete('/:id',membreController.deleteMembre);

module.exports = router;