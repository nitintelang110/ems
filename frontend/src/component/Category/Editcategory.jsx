import axios from 'axios';
import  { React,useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles  from './Editcategory.module.css';






export const Editcategory =()=>{

 const [category, setCategory] = useState({
  category:''
 });

 const Navigate = useNavigate()
  
  const{ id }= useParams();

useEffect(()=>{

  axios.get("http://localhost:8000/auth/editcategory/"+id).then(result=>{
    
 setCategory(result.data.Result)
  }).catch(err => console.log(err))
},[])

console.log(category)

const handleSubmit = (e) => {
  e.preventDefault();
  axios.put("http://localhost:8000/auth/editedcategory/" + id,  category )
    .then(result =>{console.log(result) })
  .catch(err=>console.log(err))
Navigate("/auth/admin/dashboard/category")
  
}



  return(

 
    <div className={styles.mainsection} id={styles.mainsection} onSubmit={handleSubmit}>
    
    <div className={styles.container}>
      <h4 style={{color:"#00008B",marginLeft:"20px"}}>Update Department</h4>

<form className={styles.form}  >
  <div className="mb-3">
    <label  className="form-label text-dark">Department</label>
            <input type="text" name='category' value={category}  onChange= {(e)=>setCategory(e.target.value)} autoComplete='off'  className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
 
 
  <button type="submit" className="btn btn-primary w-100 mt-">Update</button>
</form>
    </div>
    </div>



  )
}




