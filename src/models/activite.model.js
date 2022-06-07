var dbConn = require('../../config/db.config');

var Activite = function(activite){
    this.Nom               =   activite.Nom;
    this.Frequence         =   activite.Frequence ;
    this.Date_activite     =   activite.Date_activite;
    this.Section           =   activite.Section;
}

// get all activités
Activite.getAllActivites = (result) => {
    dbConn.query('SELECT * FROM Activite', (err, res) => {

        if(err){
            console.log('Error while fetching activités', err);
            result(null, err);
        }
        else{
            console.log('Activités fetched successfully!');
            result(null, res);
        }
    })
}

//create new Activite
Activite.createActivite = (activiteReqData, result) =>{
    dbConn.query('INSERT INTO Activite SET ? ' , activiteReqData, (err, res) => {
        if(err){
            console.log('Error while inserting data');
            result(null,  err);
        }
        else{
            console.log('Activite created successfully');
            result(null, res)
        }
    })

}

// get Activite by ID from DB
Activite.getActiviteByID = (id, result)=>{
    dbConn.query('SELECT * FROM Activite WHERE ID_Activite=?', id, (err, res)=>{
        if(err){
            console.log('Error while fetching Activite by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

module.exports = Activite;