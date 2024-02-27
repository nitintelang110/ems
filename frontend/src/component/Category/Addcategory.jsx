import React, { useState } from 'react'
import styles from './Addcategory.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Addcategory = () => {


  const [category, setCategory] = useState({

    name:""
  });
  

  const Navigate = useNavigate();


  const handleSubmit= async (e)=>{
    e.preventDefault();
await axios.post("http://localhost:8000/auth/addcategory", {category})
.then(res =>{
  if(res.data.Status){
    Navigate("/auth/admin/dashboard/category")
  }else{
return alert(res.data.Error)
  }
} )


  }

  return (
 <div className={styles.mainsection} id={styles.mainsection}>
    
    <div className={styles.container}>
      <h4 style={{color:"#00008B",marginLeft:"20px"}}>Add Department</h4>

<form className={styles.form} onSubmit={handleSubmit} >
  <div className="mb-3">
    <label  className="form-label text-dark">Department</label>
            <input type="text" name='category' autoComplete='off' onChange={(e) => setCategory(e.target.value)} className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
 
 
  <button type="submit" className="btn btn-primary w-100 mt-">Add</button>
</form>
    </div>
    </div>
  )
}

 
