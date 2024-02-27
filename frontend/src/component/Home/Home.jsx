import React, { useEffect, useState } from 'react'
import styles from './Home.module.css';
import axios from 'axios';
import { FaIndianRupeeSign } from "react-icons/fa6";

export const Home = () => {

  const [adminTotal, setAdminTotal] = useState();
  const [employeeTotal, setEmployeeTotal] = useState();
  const [salaryTotal, setSalaryTotal] = useState();
  
console.log(adminTotal)

  useEffect(() => {
    adminCount()
    employeeCount()
    salaryCount()
  }, [])
  

  const adminCount = () => {
    axios.get("http://localhost:8000/auth/admin_count").then(result => {
      if(result.data.Status){
      setAdminTotal(result.data.Result[0].admin)
      }
    })
  }

   const employeeCount = () => {
    axios.get("http://localhost:8000/auth/employee_count").then(result => {
      if(result.data.Status){
      setEmployeeTotal(result.data.Result[0].employee)
      }
    })
  }

   const salaryCount = () => {
    axios.get("http://localhost:8000/auth/salary_count").then(result => {
      if(result.data.Status){
      setSalaryTotal(result.data.Result[0].salary)
      }
    })
  }

  return (
    <div className={styles.container}>
      <div>
        <div className="p-3 d-flex justify-content-around mt-3 ">
          <div className="px-3 pt-2 pb-3 border shadow-sm w-25 bg-info rounded">
            <div className="text-center pb-1">
              <h4>Admin</h4>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total:</h5>
               <h5>0{adminTotal}</h5>
            </div>
          </div>
             <div className="px-3 pt-2 pb-3 border shadow-sm w-25 bg-secondary text-white rounded">
            <div className="text-center pb-1">
              <h4>Employee</h4>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total:</h5>
               <h5>0{employeeTotal}</h5>
            </div>
          </div>
            <div className="px-3 pt-2 pb-3 border shadow-sm w-25 bg-success text-white rounded">
            <div className="text-center pb-1">
              <h4>Salary</h4>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total:</h5>
               <h5 className="d-flex flex-direction-row" ><span><FaIndianRupeeSign style={{width:'60px',height:'25px'}}/></span>{salaryTotal}</h5>
            </div>
          </div>
        </div>
     </div>
    </div>
  )
}


