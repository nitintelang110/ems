import mysql from 'mysql2';


const db = mysql.createConnection({
    
    host:"sql6.freesqldatabase.com",
    user:"sql6687089",
    password:"1PRWkfX2XK",
    database:"sql6687089"
    
})

db.connect(function (err){
    if (err){ 
    console.log(err)
} else {
       
        console.log("connected")
    }
})

export default db;