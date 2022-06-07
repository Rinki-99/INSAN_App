const MembreModel = require('../models/membre.model')

// Get Membres list

exports.getMembreList = (req, res) => {
    //console.log('Here membres list');
    MembreModel.getAllMembres((err, membres) => {
        console.log('Membres are here');
        if(err)
        res.send(err);
        res.send(membres)
    })
}

//create new membre
exports.createNewMembre = (req, res) => {
    const membreReqData = new MembreModel(req.body);
    console.log('membreReqData', membreReqData);
    //check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }
    else{
        console.log('valid data');
        MembreModel.createMembre(membreReqData, (err, membre)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Membre created', data: membre})
        })
    }
}

// get membre by ID
exports.getMembreByID = (req, res)=>{
    MembreModel.getMembreByID(req.params.id, (err, membre)=>{
        if(err)
        res.send(err);
        console.log('single membre data', membre);
        res.send(membre);
    })
}

// delete Membre
exports.deleteMembre = (req, res)=>{
    MembreModel.deleteMembre(req.params.id, (err, membre)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'Membre deleted successully!'});
    })
}