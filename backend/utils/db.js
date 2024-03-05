import mysql from 'mysql2';


const db = mysql.createConnection({
    
    host:"https://ems-tau-three.vercel.app/",
    user:"root",
    password:"",
    database:"ems"
    
})

db.connect(function (err){
    if (err){ 
    console.log(err)
} else {
       
        console.log("connected")
    }
})

export default db;
