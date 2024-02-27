import mysql from 'mysql2';


const db = mysql.createConnection({
    
    host:"sql6.freesqldatabase.com",
    user:"sql6685465",
    password:"mkv6tCAGHs",
    database:"sql6685465"
    
})

db.connect(function (err){
    if (err){ 
    console.log(err)
} else {
       
        console.log("connected")
    }
})

export default db;