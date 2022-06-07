const Presence = require('../models/presence.model');
const PresenceModel = require('../models/presence.model')

// Get Presences list

exports.getPresenceList = (req, res) => {
    //console.log('Here Presences list');
    PresenceModel.getAllPresences((err, presences) => {
        console.log('Presences are here');
        if(err)
        res.send(err);
        res.send(presences)
    })
}

//create new Presence
exports.createNewPresence = (req, res) => {
    const presenceReqData = new PresenceModel(req.body);
    console.log('PresenceReqData', presenceReqData);
    //check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }
    else{
        console.log('valid data');
        PresenceModel.createPresence(presenceReqData, (err, presence)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Presence created', data: presence})
        })
    }
}

// get Presence by Member ID
exports.getPresenceByMembreID = (req, res)=>{
    PresenceModel.getPresenceByMembreID(req.params.idMembre, (err, presence)=>{
        if(err)
        res.send(err);
        console.log('single Presence data', presence);
        res.send(presence);
    })
}

// get Presence by Activity ID
exports.getPresenceByActiviteID = (req, res)=>{
    PresenceModel.getPresenceByActiviteID(req.params.idActivite, (err, presence)=>{
        if(err)
        res.send(err);
        console.log('single Presence data', presence);
        res.send(presence);
    })
}

