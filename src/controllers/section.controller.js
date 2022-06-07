const Section = require('../models/section.model');
const SectionModel = require('../models/section.model')

// Get sections list
exports.getSectionList = (req, res) => {
    //console.log('Here sections list');
    SectionModel.getAllSections((err, sections) => {
        console.log('Sections are here');
        if(err)
        res.send(err);
        res.send(sections)
    })
}

//create new section
exports.createNewSection = (req, res) => {
    const sectionReqData = new SectionModel(req.body);
    console.log('sectionReqData', sectionReqData);
    //check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }
    else{
        console.log('valid data');
        SectionModel.createSection(sectionReqData, (err, section)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Section created', data: section})
        })
    }
}

// get section by ID
exports.getSectionByID = (req, res)=>{
    SectionModel.getSectionByID(req.params.id, (err, section)=>{
        if(err)
        res.send(err);
        console.log('single section data', section);
        res.send(section);
    })
}

// update section
exports.updateSection = (req, res)=>{
    const sectionReqData = new SectionModel(req.body);
    console.log('sectionReqData update', sectionReqData);
    //check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }
    else{
        SectionModel.updateSection(req.params.id, sectionReqData, (err, section)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Section updates', data: section.insertId})
        })
    }
}

// delete Section
exports.deleteSection = (req, res)=>{
    SectionModel.deleteSection(req.params.id, (err, section)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'Section deleted successully!'});
    })
}

// get taux présence par activite et par mois
exports.getTauxPresenceActiviteMois = (req, res)=>{
    SectionModel.getTauxPresenceActiviteMois(req.params.mois, req.params.activite, (err, section)=>{
        if(err)
        res.send(err);
        console.log('Taux section', section);
        res.send(section);
    })
}