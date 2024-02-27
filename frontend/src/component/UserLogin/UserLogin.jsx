import { React,useState } from 'react';
import styles from './UserLogin.module.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export const UserLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
 
 
  const [errors, setErrors] = useState();


  const Navigate = useNavigate();
 
  axios.defaults.withCredentials = true;  //to save the token in cookies
   const handleSubmitEmployee = (e)=>{
    e.preventDefault();
     let values = {
      email:email.email,
      password:password.password
    }
     axios.post("http://localhost:8000/employee/employeelogins", values)
        .then(result => {
          if (result.data.loginStatus) {  //taking this status from backend if its match then open dashboard other wise send error which we set in backend
            //access only when we login valid
                  localStorage.setItem("valid",true)      
         Navigate("/employee_details/"+result.data.id)
          }else{
            setErrors(result.data.Error)
          }
          
   })
        .catch(err => console.log(err))
    }
 
  return (
    <div className={styles.mainsection} id={styles.mainsection}>
       <h4 style={{color:"white",marginLeft:"20px"}}>Employee Login</h4>
      <div className='text-danger'> <h6>{errors}</h6></div>
      
    <div className={styles.container}>
     
<form className={styles.form} onSubmit={handleSubmitEmployee}>
  <div className="mb-3">
    <label  className="form-label text-white">Email</label>
            <input type="email" name='email' autoComplete='off' onChange={(e) => setEmail({ ...email, email: e.target.value })} className="form-control bg-transparent border text-white" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label  className="form-label text-white">Password</label>
    <input type="passward"  name="password"autoComplete='off' onChange={(e) => setPassword({ ...password, password: e.target.value })} className="form-control bg-transparent border text-white" id="exampleInputPassword1"/>
  </div>
 
  <button type="submit" className="btn btn-info w-100 mt-"><b>Submit</b></button>
</form>
    </div>
    </div>
  )
}


