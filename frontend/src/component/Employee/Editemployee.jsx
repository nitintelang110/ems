import React,{useState,useEffect }  from 'react';
import styles from './Editemployee.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Editemployee = () => {

  const { id } = useParams();

  const Navigate = useNavigate();

const [employee, setEmployee] = useState({
    name:'',
    email:'',
    salary:'',
    address:'',
    category:'',
 
});


const [category,setCategory]=useState([]);

useEffect(()=>{
//getting here categories
  axios.get("http://localhost:8000/auth/addcategory").then(result=>{
    if (result.data.Status) {

      setCategory((result.data.Result))
    }else{
      alert(result.data.Error)
    }
  }).catch(err => console.log(err))

//get for edit 
    axios.get("http://localhost:8000/auth/editemployee/"+id).then(result=>{
setEmployee({...employee,
name:result.data.Result[0].name,
email:result.data.Result[0].email,
address:result.data.Result[0].address,
salary:result.data.Result[0].salary,
category:result.data.Result[0].category,
    })
  
  }).catch(err => console.log(err))
},[])



  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:8000/auth/editedmployee/" + id,  employee )
      .then(result =>{console.log(result) })
    .catch(err=>console.log(err))
Navigate("/auth/admin/dashboard/employee")
    
  }


  return (
    <div className={styles.mainsection} id={styles.mainsection}>
    
    <div className={styles.container}>
      <h4 style={{color:"#00008B"}} className='d-flex justify-content-center align-items-center'>Edit Employee</h4>

<form className={styles.form} onSubmit={handleSubmit}>
  <div className="mb-3">
    <label  className="form-label text-dark">Name</label>
            <input type="text" name='name' value={employee.name}  onChange={(e) => setEmployee({...employee, name:e.target.value})} placeholder='Enter Name' autoComplete='off'  className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
 
  <div className="mb-3">
    <label  className="form-label text-dark">Email</label>
            <input type="text" name='email' value={employee.email}  onChange={(e) => setEmployee({...employee, email:e.target.value})}  placeholder='Enter Email' autoComplete='off'  className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>

 
  <div className="mb-3">
    <label  className="form-label text-dark">Address</label>
            <input type="text" name='address' value={employee.address} onChange={(e) => setEmployee({...employee, address:e.target.value})}  placeholder='Enter Adress' autoComplete='off' className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>

  <div className="mb-3">
    <label  className="form-label text-dark">Category</label>
            <select name='category' id='categoryId'  className="form-select" onChange={(e) => setEmployee({...employee, category:e.target.value})}>
            <option value={employee.category}>{employee.category}</option>
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
            <input type="text" name='salary' value={employee.salary} onChange={(e) => setEmployee({...employee, salary:e.target.value})}  placeholder='00.00.000' autoComplete='off' className="form-control text-capital" id="exampleInputEmail1" aria-describedby="emailHelp" required />
  </div>
 
 
 
  <button type="submit" className="btn btn-success w-100 mt-">Submit</button>
</form>
    </div>
    </div>
  )
}

