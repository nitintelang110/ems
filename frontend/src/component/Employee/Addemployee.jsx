import React, { useEffect, useState } from 'react';
import styles from './Addemployee.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Addemployee = () => {


const [employee, setEmployee] = useState({
    name:'',
    email:'',
    password:'',
    category:'',
    salary:'',
    address:'',
    image:'',

});
  const [category, setCategory] = useState([]);
  const Navigate = useNavigate();

const handleSubmit = (e)=>{
  e.preventDefault();
  //we should not send file from front end without this code bcoz file always use form data object so we cant send file without this so that why we need for all input bcoz file also going with this input
  const formData = new FormData();
  formData.append('name', employee.name);
  formData.append('email', employee.email);
  formData.append('password', employee.password);
  formData.append('address', employee.address);
  formData.append('salary', employee.salary);
  formData.append('category', employee.category);
  formData.append('image', employee.image);
  //end form data

console.log(employee)
  axios.post('http://localhost:8000/auth/addemployee', formData )
   .then(result =>{
  if(result.data.Status){
    Navigate("/auth/admin/dashboard/employee")
  }else{
return alert(result.data.Error)
  }
} )
}

  
useEffect(()=>{
    axios.get("http://localhost:8000/auth/addcategory").then(result=>{
      if (result.data.Status) {
  
        setCategory((result.data.Result))
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))
  },[])





  return (
   
         <div className={styles.mainsection} id={styles.mainsection}>
    
    <div className={styles.container}>
      <h4 style={{color:"#00008B"}} className='d-flex justify-content-center align-items-center'>Add Employee</h4>

<form className={styles.form} onSubmit={handleSubmit} >
  <div className="mb-3">
    <label  className="form-label text-dark">Name</label>
            <input type="text" name='name' placeholder='Enter Name' autoComplete='off' onChange={(e) => setEmployee({...employee, name:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
 
  <div className="mb-3">
    <label  className="form-label text-dark">Email</label>
            <input type="text" name='email'  placeholder='Enter Email' autoComplete='off' onChange={(e) => setEmployee({...employee, email:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
 
  <div className="mb-3">
    <label  className="form-label text-dark">Password</label>
            <input type="password" name='password'  placeholder='Enter Password' autoComplete='off' onChange={(e) => setEmployee({...employee, password:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>


  <div className="mb-3">
    <label  className="form-label text-dark">Category</label>
            <select name='category' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, category:e.target.value})}>
             <option>-- Select Category --</option>
                {category.map((c,id)=>{
                    return(
                        <>
                    <option key={id} value={c.name}>{c.name}</option>
                    </>
                    )
                })}
            </select>
  </div>
 
  <div className="mb-3">
    <label  className="form-label text-dark">Salary</label>
            <input type="text" name='salary'  placeholder='00.00.000' autoComplete='off' onChange={(e) => setEmployee({...employee, salary:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>

  <div className="mb-3">
    <label  className="form-label text-dark">Address</label>
            <input type="text" name='address'  placeholder='Enter Adress' autoComplete='off' onChange={(e) => setEmployee({...employee, address:e.target.value})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>

  <div className="mb-3">
    <label  className="form-label text-dark">Image</label>
            <input type="file" name='image' autoComplete='off' onChange={(e) => setEmployee({...employee, image:e.target.files[0]})} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
 
 
 
  <button type="submit" className="btn btn-success w-100 mt-">Add</button>
</form>
    </div>
    </div>
  
  )
}

