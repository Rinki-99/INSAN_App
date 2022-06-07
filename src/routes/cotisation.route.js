const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const cotisationController = require('../controllers/cotisation.controller');

// Cotisation List
router.get('/', cotisationController.getCotisationList);

//create new cotisation
router.post('/', cotisationController.createNewCotisation);

//get cotisation by id
router.get('/:id',cotisationController.getCotisationByID);

//taux cotisation par groupe, trimestre et année
router.get('/taux/:trimestre/:annee', cotisationController.getTauxCotisation);

//update cotisation
router.put('/:id', cotisationController.updateCotisation);

module.exports = router;