const ActiviteModel = require('../models/activite.model')

// Get activités list

exports.getActiviteList = (req, res) => {
    //console.log('Here activité list');
    ActiviteModel.getAllActivites((err, activites) => {
        console.log('Activités are here');
        if(err)
        res.send(err);
        res.send(activites)
    })
}

//create new Activite
exports.createNewActivite = (req, res) => {
    console.log('req data', req.body);
    const activiteReqData = new ActiviteModel(req.body);
    console.log('ActiviteReqData', activiteReqData);
    //check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }
    else{
        console.log('valid data');
        ActiviteModel.createActivite(activiteReqData, (err, activite)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Activite created', data: activite})
        })
    }
}

// get Activite by ID
exports.getActiviteByID = (req, res)=>{
    ActiviteModel.getActiviteByID(req.params.id, (err, activite)=>{
        if(err)
        res.send(err);
        console.log('single Activite data', activite);
        res.send(activite);
    })
}