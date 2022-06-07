const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const presenceController = require('../controllers/presence.controller');

// Presence List
router.get('/', presenceController.getPresenceList);

// create new Presence
router.post('/', presenceController.createNewPresence);

//get Presence by member id
router.get('/membreID/:idMembre',presenceController.getPresenceByMembreID);

//get Presence by activity id
router.get('/activiteID/:idActivite',presenceController.getPresenceByActiviteID);

module.exports = router;