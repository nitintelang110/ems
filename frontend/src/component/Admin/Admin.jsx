import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from './Admin.module.css';
import { Outlet } from 'react-router-dom';
import axios from 'axios'


export const Admin = () => {

  const Navigate = useNavigate()

  axios.defaults.withCredentials = true;

const handleLogout =()=>{
  axios.get('http://localhost:8000/auth/logout').then((result)=>{
    if (result.data.Status) {
      //if we logout remove cockies
      localStorage.removeItem("valid")
      Navigate('/')
    }
  })
}


    return (
        <div className= "container-fluid">
            <div className= "row flex-nowrap">
                <div className= "col-auto col-md-3 col-xl-2 px-sm-2 px-0" id={styles.vertical_navbar}>
                    <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
              <Link to="/auth/admin/dashboard" className='d-flex align-item-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none'>
                <marquee id={styles.marque} className='px-5 fm-5 fw-bolder d-none d-sm-inline mx-2 text-info' scrolldelay='250' >NTCODER</marquee>
               </Link>
              <ul className='nav nav-pills flex-column mb-sm-auto mb-o align-items-center align-items-sm-start'>
                <li className='w-100'>
                  <Link to="/auth/admin/dashboard" className='nav-link text-white px-0 align-middle'>
                    
                    <i className='fs-4 bi-speedometer2 ms-2'></i>
                    <span className='ms-2 d-none d-sm-inline'>Dashboard</span>
                    </Link>
                </li>
                <li className='w-100'>
                  <Link to="/auth/admin/dashboard/employee" className='nav-link text-white px-0 align-middle'>
                    
                    <i className='fs-4 bi-people ms-2'></i>
                    <span className='ms-2 d-none d-sm-inline'>Manage Employee</span>
                    </Link>
                </li>
                 <li className='w-100'>
                  <Link to="/auth/admin/dashboard/category" className='nav-link text-white px-0 align-middle'>
                    
                    <i className='fs-4 bi-columns ms-2'></i>
                    <span className='ms-2 d-none d-sm-inline'>Department</span>
                    </Link>
                </li>
                <li className='w-100'>
                  <Link to="/auth/admin/dashboard/profile" className='nav-link text-white px-0 align-middle'>
                    
                    <i className='fs-4 bi-person ms-2'></i>
                    <span className='ms-2 d-none d-sm-inline'>Profile</span>
                    </Link>
                </li>
                 <li className='w-100'>
                  <Link onClick={handleLogout} className='nav-link text-white px-0 align-middle'>
                    
                    <i className='fs-4 bi-power ms-2'></i>
                    <span className='ms-2 d-none d-sm-inline'>Log Out</span>
                    </Link>
                </li>
              </ul>
                    </div>
          </div>
          
          <div className='col p-0 m-0 '>
            <div className='p-2 d-flex justify-content-center shadow'>
              <h4>Employee Management System</h4>
            </div>
            <Outlet/>
          </div>
            </div>

        </div>
    )
}
