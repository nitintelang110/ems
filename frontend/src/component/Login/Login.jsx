import { React,useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export const Login = () => {

  const [values, setValues] = useState({
        
    email: "",
    passward:""

    });
  const [error, setError] = useState();

  const Navigate = useNavigate();
 
  axios.defaults.withCredentials = true;  //to save the token in cookies
   const handleSubmit = (e)=>{
      e.preventDefault();
      axios.post("https://emsfrontend-rust.vercel.app/auth/adminlogin", values)
        .then(result => {
          if (result.data.loginStatus) {  //taking this status from backend if its match then open dashboard other wise send error which we set in backend
           //if login valid then navigate
            localStorage.setItem("valid",true)
             Navigate("/auth/admin/dashboard")
          }else{
            setError(result.data.Error)
          }
        })
        .catch(err => console.log(err))
    
    }
    
  return (
    <div className={styles.mainsection} id={styles.mainsection}>
       <h4 style={{color:"black",marginLeft:"20px"}}>Admin Login</h4>
      <div className='text-danger'> <h6>{error}</h6></div>
      
    <div className={styles.container}>
     
<form className={styles.form} onSubmit={handleSubmit}>
  <div className="mb-3">
    <label  className="form-label text-white">Email</label>
            <input type="email" name='email' autoComplete='off' onChange={(e) => setValues({ ...values, email: e.target.value })} className="form-control bg-transparent border text-white" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label  className="form-label text-white">Password</label>
    <input type="passward"  name="passward"autoComplete='off' onChange={(e) => setValues({ ...values, passward: e.target.value })} className="form-control bg-transparent border text-white" id="exampleInputPassword1"/>
  </div>
 
  <button type="submit" className="btn btn-info w-100 mt-"><b>Submit</b></button>
</form>
    </div>
    </div>
  )
}

