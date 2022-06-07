var dbConn = require('../../config/db.config');

var Section = function(section){
    this.Nom                  =   section.Nom;
    this.Region               =   section.Region;
    this.Date_election_CS     =   section.Date_election_CS;
    this.Date_creation        =   section.Date_creation;
    this.Frequence_de_CS      =   section.Frequence_de_CS;
    this.Responsable          =   section.Responsable;
    this.Suppleant            =   section.Suppleant;
}

// get all sections
Section.getAllSections = (result) => {
    dbConn.query('SELECT * FROM Section', (err, res) => {

        if(err){
            console.log('Error while fetching sections', err);
            result(null, err);
        }
        else{
            console.log('Sections fetched successfully!');
            result(null, res);
        }
    })
}

//create new section
Section.createSection = (sectionReqData, result) =>{
    dbConn.query('INSERT INTO Section SET ? ' , sectionReqData, (err, res) => {
        if(err){
            console.log('Error while inserting data');
            result(null,  err);
        }
        else{
            console.log('Section created successfully');
            result(null, res)
        }
    })

}

// get section by ID from DB
Section.getSectionByID = (id, result)=>{
    dbConn.query('SELECT * FROM Section WHERE ID_Section=?', id, (err, res)=>{
        if(err){
            console.log('Error while fetching section by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

// update section
Section.updateSection = (id, sectionReqData, result)=>{
    dbConn.query("UPDATE Section SET Nom=?, Region=?, Date_election_CS=?, Date_creation=?, Frequence_de_CS=?, Responsable=?, Suppleant=? WHERE ID_Section = ?",
                 [sectionReqData.Nom, sectionReqData.Region, sectionReqData.Date_election_CS, sectionReqData.Date_creation, sectionReqData.Frequence_de_CS, sectionReqData.Responsable, sectionReqData.Suppleant, id],
                 (err, res)=>{
                     if(err){
                         console.log('Error while updating the section');
                         result(null, err);
                     }
                     else{
                         console.log('Section updated');
                         result(null, res);
                     }
                 });
}

// delete Section
Section.deleteSection = (id, result)=>{
     dbConn.query('DELETE FROM Section WHERE ID_Section=?', [id], (err, res)=>{
         if(err){
             console.log('Error while deleting the Section');
             result(null, err);
         }else{
             result(null, res);
         }
    });
}

//  get taux présence par activite et par mois
Section.getTauxPresenceActiviteMois = (mois, activite, result)=>{
    dbConn.query('SELECT round(count(*)/(select count(*) from present_absent where Activite = ?)*100) as Percentage_presences, a.Nom as Activite, a.date_activite FROM Activite a INNER JOIN present_absent p ON a.ID_Activite = p.Activite WHERE p.date_activite LIKE ? AND p.Activite = ? AND p.present = 1', [activite,mois + '%', activite], (err, res)=>{
        if(err){
            console.log('Error while searching taux activité');
            result(null,err);
        }else{
            result(null,res);
        }
    });
}

module.exports = Section;