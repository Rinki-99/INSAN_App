var dbConn = require('../../config/db.config');

var Membre = function(membre){
    this.Nom                  =   membre.Nom;
    this.Prenom               =   membre.Prenom;
    this.montant_cotisation   =   membre.montant_cotisation;
    this.Groupe               =   membre.Groupe;
}

// get all membres
Membre.getAllMembres = (result) => {
    dbConn.query('SELECT * FROM Membre', (err, res) => {

        if(err){
            console.log('Error while fetching membres', err);
            result(null, err);
        }
        else{
            console.log('Membres fetched successfully!');
            result(null, res);
        }
    })
}

//create new membre
Membre.createMembre = (membreReqData, result) =>{
    dbConn.query('INSERT INTO Membre SET ? ' , membreReqData, (err, res) => {
        if(err){
            console.log('Error while inserting data');
            result(null,  err);
        }
        else{
            console.log('Membre created successfully');
            result(null, res)
        }
    })

}

// get membre by ID from DB
Membre.getMembreByID = (id, result)=>{
    dbConn.query('SELECT * FROM Membre WHERE ID_Membre=?', id, (err, res)=>{
        if(err){
            console.log('Error while fetching Membre by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

// delete Membre
Membre.deleteMembre = (id, result)=>{
    dbConn.query('DELETE FROM Membre WHERE ID_Membre=?', [id], (err, res)=>{
        if(err){
            console.log('Error while deleting the Membre');
            result(null, err);
        }else{
            result(null, res);
        }
   });
}

module.exports = Membre;