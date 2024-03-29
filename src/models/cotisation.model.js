var dbConn = require('../../config/db.config');

var Cotisation = function(cotisation){
    this.Montant_cotise     =   cotisation.Montant_cotise;
    this.Trimestre          =   cotisation.Trimestre;
    this.Annee              =   cotisation.Annee;
    this.Membre             =   cotisation.Membre;
}

// get all cotisations
Cotisation.getAllCotisations = (result) => {
    dbConn.query('SELECT * FROM Cotisation', (err, res) => {

        if(err){
            console.log('Error while fetching cotisations', err);
            result(null, err);
        }
        else{
            console.log('Cotisations fetched successfully!');
            result(null, res);
        }
    })
}

//create new Cotisation
Cotisation.createCotisation = (cotisationReqData, result) =>{
    dbConn.query('INSERT INTO Cotisation SET ? ' , cotisationReqData, (err, res) => {
        if(err){
            if(err.errno == 1062){
                dbConn.query("UPDATE Cotisation SET Montant_cotise=?, Trimestre=?, Annee=?, Membre=? WHERE Trimestre=? AND Annee=? AND Membre=?",
                [cotisationReqData.Montant_cotise, cotisationReqData.Trimestre, cotisationReqData.Annee, cotisationReqData.Membre, cotisationReqData.Trimestre, cotisationReqData.Annee, cotisationReqData.Membre],
                (err, res)=>{
                    if(err){
                        console.log('Error while updating the Cotisation');
                        result(null, err);
                    }
                    else{
                        console.log('Cotisation updated');
                        result(null, res);
                    }
                });
            }
            else {
                console.log('Error while inserting data');
                result(null,  err);
            }
        }
        else{
            console.log('Cotisation created successfully');
            result(null, res)
        }
    })

}

// get Cotisation by ID from DB
Cotisation.getCotisationByID = (id, result)=>{
    dbConn.query('SELECT * FROM Cotisation WHERE ID_Cotisation=?', id, (err, res)=>{
        if(err){
            console.log('Error while fetching Cotisation by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}


//Taux de cotisation par groupe, semestre et année
Cotisation.getTauxCotisation = (trimestre, annee, result)=>{
    
    const qry = `SELECT ROUND(sum(IF(tab.Trimestre = ? AND tab.Annee = ?,tab.Montant_cotise,0))/sum(tab.montant_cotisation)*100) as montant_tot_cotise, sum(IF(tab.Trimestre = ? AND tab.Annee = ?,tab.Montant_cotise,0)) as Montant_cotise, sum(tab.montant_cotisation) as Montant_a_cotise, tab.Groupe 
                       FROM (SELECT  *
                       FROM Cotisation
                       LEFT JOIN Membre
                       ON Cotisation.Membre = Membre.ID_Membre
                    UNION
                       SELECT  *
                       FROM Cotisation
                       RIGHT JOIN Membre
                       ON Cotisation.Membre = Membre.ID_Membre) tab
                       GROUP BY tab.Groupe;`
    
    dbConn.query(qry, [trimestre, annee, trimestre, annee], (err, res)=>{
                     if(err){
                         console.log('Error while searching taux cotisation', err);
                     }else{
                         result(null, res);
                     }
                 })
}

// update Cotisation
Cotisation.updateCotisation = (annee, semestre, membre, cotisationReqData, result)=>{
    dbConn.query("UPDATE Cotisation SET Montant_cotise=?, Trimestre=?, Annee=?, Membre=? WHERE Trimestre=? AND Annee=? AND Membre=?",
                 [cotisationReqData.Montant_cotise, cotisationReqData.Trimestre, cotisationReqData.Annee, cotisationReqData.Membre, semestre, annee, membre],
                 (err, res)=>{
                     if(err){
                         console.log('Error while updating the Cotisation');
                         result(null, err);
                     }
                     else{
                         console.log('Cotisation updated');
                         result(null, res);
                     }
                 });
}


module.exports = Cotisation;
