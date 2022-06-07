const CotisationModel = require('../models/cotisation.model')

// Get cotisation list

exports.getCotisationList = (req, res) => {
    //console.log('Here cotisation list');
    CotisationModel.getAllCotisations((err, cotisations) => {
        console.log('Cotisations are here');
        if(err)
        res.send(err);
        res.send(cotisations)
    })
}

//create new Cotisation
exports.createNewCotisation = (req, res) => {
    const cotisationReqData = new CotisationModel(req.body);
    console.log('CotisationReqData', cotisationReqData);
    //check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }
    else{
        console.log('valid data');
        CotisationModel.createCotisation(cotisationReqData, (err, cotisation)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Cotisation created', data: cotisation})
        })
    }
}

// get Cotisation by ID
exports.getCotisationByID = (req, res)=>{
    CotisationModel.getCotisationByID(req.params.id, (err, cotisation)=>{
        if(err)
        res.send(err);
        console.log('single Cotisation data', cotisation);
        res.send(cotisation);
    })
}

// taux de cotisation par groupe, trimestre et année
exports.getTauxCotisation = (req, res)=>{
    CotisationModel.getTauxCotisation(req.params.trimestre, req.params.annee, (err, cotisation)=>{
        if(err)
        res.send(err);
        console.log('Taux cotisation par groupe', cotisation);
        res.send(cotisation);
    })
}

// update Cotisation
exports.updateCotisation = (req, res)=>{
    const cotisationReqData = new CotisationModel(req.body);
    console.log('CotisationReqData update', cotisationReqData);
    //check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }
    else{
        CotisationModel.updateCotisation(req.params.id, cotisationReqData, (err, cotisation)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Cotisation updates', data: cotisation.insertId})
        })
    }
}