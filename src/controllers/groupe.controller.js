const GroupeModel = require('../models/groupe.model')

// Get groupes list

exports.getGroupeList = (req, res) => {
    //console.log('Here groupes list');
    GroupeModel.getAllGroupes((err, groupes) => {
        console.log('Groupes are here');
        if(err)
        res.send(err);
        res.send(groupes)
    })
}

//create new groupe
exports.createNewGroupe = (req, res) => {
    console.log('req data', req.body);
    const groupeReqData = new GroupeModel(req.body);
    console.log('groupeReqData', groupeReqData);
    //check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }
    else{
        console.log('valid data');
        GroupeModel.createGroupe(groupeReqData, (err, groupe)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Groupe created', data: groupe})
        })
    }
}

// get groupe by ID
exports.getGroupeByID = (req, res)=>{
    GroupeModel.getGroupeByID(req.params.id, (err, groupe)=>{
        if(err)
        res.send(err);
        console.log('single groupe data', groupe);
        res.send(groupe);
    })
}

// delete Groupe
exports.deleteGroupe = (req, res)=>{
    GroupeModel.deleteGroupe(req.params.id, (err, groupe)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'Groupe deleted successully!'});
    })
}