var dbConn = require('../../config/db.config');

var Groupe = function(groupe){
    this.Nom_groupe        =   groupe.Nom_groupe;
    this.Ville             =   groupe.Ville;
    this.Responsable       =   groupe.Responsable;
    this.Section           =   groupe.Section;
}

// get all groupes
Groupe.getAllGroupes = (result) => {
    dbConn.query('SELECT * FROM Groupe', (err, res) => {

        if(err){
            console.log('Error while fetching groupes', err);
            result(null, err);
        }
        else{
            console.log('Groupes fetched successfully!');
            result(null, res);
        }
    })
}

//create new groupe
Groupe.createGroupe = (groupeReqData, result) =>{
    dbConn.query('INSERT INTO Groupe SET ? ' , groupeReqData, (err, res) => {
        if(err){
            console.log('Error while inserting data');
            result(null,  err);
        }
        else{
            console.log('Groupe created successfully');
            result(null, res)
        }
    })

}

// get groupe by ID from DB
Groupe.getGroupeByID = (id, result)=>{
    dbConn.query('SELECT * FROM Groupe WHERE ID_Groupe=?', id, (err, res)=>{
        if(err){
            console.log('Error while fetching groupe by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

// delete Groupe
Groupe.deleteGroupe = (id, result)=>{
    dbConn.query('DELETE FROM Groupe WHERE ID_Groupe=?', [id], (err, res)=>{
        if(err){
            console.log('Error while deleting the Groupe');
            result(null, err);
        }else{
            result(null, res);
        }
   });
}

// get groupe by ID from DB
Groupe.getMembresByGroupeID = (id, result)=>{
    dbConn.query('SELECT * FROM Membre WHERE Groupe=?', id, (err, res)=>{
        if(err){
            console.log('Error while fetching membres by groupe id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}


module.exports = Groupe;