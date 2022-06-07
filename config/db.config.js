const mysql = require('mysql')


// Connection Details 
const dbConn = mysql.createPool({
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'b39de166698829',
    password: 'bfd17a8b',
    database: 'heroku_23ed422d7cab436'
});

dbConn.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });

dbConn.connect(function(error){
    
    if(error) throw error;
    console.log('Database connected successfully!!');
})

module.exports = dbConn;
