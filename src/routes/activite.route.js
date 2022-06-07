const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const activiteController = require('../controllers/activite.controller');

// Membres List
router.get('/', activiteController.getActiviteList);

//create new activite
router.post('/', activiteController.createNewActivite);

//get activite by id
router.get('/:id',activiteController.getActiviteByID);

module.exports = router;