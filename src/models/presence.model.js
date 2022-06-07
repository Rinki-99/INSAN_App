var dbConn = require('../../config/db.config');

var Presence = function(presence){
    this.Membre            =   presence.Membre;
    this.Activite          =   presence.Activite;
    this.date_activite     =   presence.date_activite;
    this.present           =   presence.present
}

// get all Présences
Presence.getAllPresences = (result) => {
    dbConn.query('SELECT a.Nom as Activite, m.Nom, m.Prenom, p.date_activite, p.present FROM present_absent p INNER JOIN Activite a ON a.ID_Activite = p.Activite INNER JOIN Membre m ON m.ID_Membre = p.Membre ', (err, res) => {

        if(err){
            console.log('Error while fetching Presences', err);
            result(null, err);
        }
        else{
            console.log('Presences fetched successfully!');
            result(null, res);
        }
    })
}

//create new presence
Presence.createPresence = (presenceReqData, result) =>{
    dbConn.query('INSERT INTO present_absent SET ? ' , presenceReqData, (err, res) => {
        if(err){
            console.log('Error while inserting data');
            result(null,  err);
        }
        else{
            console.log('Presence created successfully');
            result(null, res)
        }
    })

}

// get presence by Member ID from DB
Presence.getPresenceByMembreID = (idMembre, result)=>{
    dbConn.query('SELECT a.Nom as Activite, m.Nom, m.Prenom, p.date_activite, p.present FROM present_absent p INNER JOIN Activite a ON a.ID_Activite = p.Activite INNER JOIN Membre m ON m.ID_Membre = p.Membre  WHERE Membre=?', idMembre, (err, res)=>{
        if(err){
            console.log('Error while fetching presence by member id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

// get presence by Activity ID from DB
Presence.getPresenceByActiviteID = (idActivite, result)=>{
    dbConn.query('SELECT a.Nom as Activite, m.Nom, m.Prenom, p.date_activite, p.present FROM present_absent p INNER JOIN Activite a ON a.ID_Activite = p.Activite INNER JOIN Membre m ON m.ID_Membre = p.Membre WHERE Activite=?', idActivite, (err, res)=>{
        if(err){
            console.log('Error while fetching presence by activity id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}


module.exports = Presence;