import express from 'express';
import db from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer'; //to handle image upload
import path from 'path'


const router = express.Router();

//for get public folder in front to show images
//app.use(express.static('Public'))

//for login cross check
router.post('/adminlogin', (req, res) => {
    /* to check input usr name and id with data base for login  */
 
    const sql = "SELECT * from `admin` Where email =? and passward =?"
     db.query(sql, [req.body.email, req.body.passward], (err, result) => {
        console.log(result)
        if (err) return res.json({ loginStatus: false, Error: "Query Error"});
        if (result.length > 0) {
            const email = result[0].email; /*match here email */

            /*agar email match hai to genereate token */
            const token = jwt.sign({/*payload */ role: "admin", /*for payload match*/ email: email ,id:result[0].id /*decoding id for roll base accessing*/}, /*secrete key */"jwt_secret_key", { expiresIn: "1d" });

            res.cookie('token', token) /*to match the token and stored it in coockies */
            
        return res.json({ loginStatus: true });
        }else{
        return res.json({ loginStatus: false, Error:"provide correct userId & passward" })
    }
})
})


//for add new category
router.post("/addcategory", (req,res)=>{
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    db.query(sql,[req.body.category],(err,result)=>{
if (err) {
    return result.json({Status:false, Error:"Network Error"})
} else {
  return res.json({Status:true})  
}
    }) 
})




//for access new added category
router.get("/addcategory",(req,res)=>{
    const sql = "SELECT * FROM `category`"
    db.query(sql, (err, result) => {
       
        if (err) {
            return result.json({Status:false, Error:"Network Error"})
        } else {
          return res.json({Status:true ,Result:result})  
        }
    })
})


//for access category for edit
router.get("/editcategory/:id", (req, res) => {
    
    const id = req.params.id;
 
    const sql = "SELECT * FROM category WHERE id = ?"
  
    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.json({Status:false, Error:"Network Error"})
        } else {
          return res.json({Status:true ,Result:result[0].name})  
          
        }
    
    })
})

//for edited category
router.put("/editedcategory/:id",(req, res) => {
    const id = req.params.id;
    const sql = "UPDATE `category` set name=? Where id = ?" 
    const values = [
      
        req.body.category
    ]
    console.log(...values)
    db.query(sql, [...values, id], (err, result) => {
        if (err) {
            return res.json({Status:false, Error:"Network Error ahe bhau"})
        } else {
          return res.json({Status:true ,Result:result})  
          
        }
    })
})




//uploaded image stored in our public folder and help to find path and help to show
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    } //cb=callback , null =err , upload date 
})

const upload = multer({
    storage: storage    //for upload
})


//for add new employee
router.post("/addemployee",upload.single('image') ,(req, res) => {
    console.log(req.body)
    const sql = "INSERT INTO `employee`(`name`, `email`, `password`, `salary`, `address`, `category`, `image`) VALUES (?)" //for multi input we use back tick for whole query
   bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
            if (err) return res.json({ Status: false, Error: "Query Error"});
        
    const values = [
        req.body.name,
        req.body.email,
        hash,
        req.body.salary,
        req.body.address,
        req.body.category,
        req.file.filename,
      
]
    db.query(sql,[values],(err,result)=>{
if (err) {
    return res.json({Status:false, Error:"Network Error" + err})
} else {
  return res.json({Status:true ,Result:result})  
}
    })
    })  //here we encrypt our passward and append 10 unique char to our passward   
})

//for access new employee
router.get("/addemployee",(req,res)=>{
    const sql = "SELECT * FROM `employee`"
    db.query(sql,(err,result)=>{
        if (err) {
            return res.json({Status:false, Error:"Network Error"})
        } else {
          return res.json({Status:true ,Result:result})  
        }
    })
})

// for edit 
router.get("/editemployee/:id", (req, res) => {
    
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?"
    db.query(sql, [id], (err, result) => {
       
        if (err) {
            return res.json({Status:false, Error:"Network Error"})
        } else {
          return res.json({Status:true ,Result:result})  
          
        }
    })
})



// for delete employee
router.delete("/deleteEmployee/:id", (req, res) => {
    console.log(req.params.id)
    const id = req.params.id;
    const sql = "DELETE FROM `employee` WHERE id = ?"
    db.query(sql, [id], (err, result) => {
       
        if (err) {
            return res.json({Status:false, Error:"Network Error"})
        } else {
          return res.json({Status:true ,Result:result})  
          
        }
    })
})

// for delete category
router.delete("/delete_category/:id", (req, res) => {
    
    const id = req.params.id;
    const sql = "DELETE FROM `category` WHERE id = ?"
    db.query(sql, [id], (err, result) => {
       
        if (err) {
            return res.json({Status:false, Error:"Network Error"})
        } else {
          return res.json({Status:true ,Result:result})  
          
        }
    })
})




//for edited employee
router.put("/editedmployee/:id",(req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee set name=?,email=?,salary=?,address=?,category=? Where id = ?` //for multi input we use back tick for whole query
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category,  
    ]
    
    db.query(sql, [...values, id], (err, result) => {
        if (err) {
            return res.json({Status:false, Error:"Network Error ahe bhau"})
        } else {
          return res.json({Status:true ,Result:result})  
          
        }
    })
})



//for admin count on dashboard
router.get("/admin_count", (req, res) => {
    const sql = 'SELECT count(id) as admin from admin'
       db.query(sql,(err, result) => {
        if (err) {
            return res.json({Status:false, Error:"Network Error ahe bhau"})
        } else {
          return res.json({Status:true ,Result:result})  
          
        }
    })
})

//for employee count on dashboard
router.get("/employee_count", (req, res) => {
    const sql = 'SELECT count(id) as employee from employee'
       db.query(sql,(err, result) => {
        if (err) {
            return res.json({Status:false, Error:"Network Error ahe bhau"})
        } else {
          return res.json({Status:true ,Result:result})  
          
        }
    })
})

//API for salary count on dashboard
router.get("/salary_count", (req, res) => {
    const sql = 'SELECT sum(salary) as salary from employee'
       db.query(sql,(err, result) => {
        if (err) {
            return res.json({Status:false, Error:"Network Error ahe bhau"})
        } else {
          return res.json({Status:true ,Result:result})  
          
        }
    })
})

//api for logout
router.get('/logout',(req,res) => {
res.clearCookie('token')
return res.json({Status:true})
})

export { router as adminRouter }