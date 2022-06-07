const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const sectionController = require('../controllers/section.controller');

// Sections List
router.get('/', sectionController.getSectionList);

// create new section
router.post('/', sectionController.createNewSection);

//get section by id
router.get('/:id',sectionController.getSectionByID);

//update section
router.put('/:id', sectionController.updateSection);

//delete section
router.delete('/:id', sectionController.deleteSection);

//taux présence 
router.get('/taux/:mois/:activite', sectionController.getTauxPresenceActiviteMois);


module.exports = router;