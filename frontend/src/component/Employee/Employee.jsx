
import React,{useState,useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Employee.module.css';


export const Employee = () => {

  const Navigate = useNavigate();
  const [employee,setEmployee]=useState([]);
const {id} = useParams();
  const [searchName, setSearchName] = useState('');

  useEffect(()=>{
  
    axios.get("http://localhost:8000/auth/addemployee").then(result=>{
      if (result.data.Status) {
  
        setEmployee((result.data.Result))
      }else{
        alert(result.data.Error)
      }
  
    }).catch(err => console.log(err))
  
  },[])
  
  const handleDelete = (id) => {
   
    axios.delete("http://localhost:8000/auth/deleteEmployee/"+id).then(result => {
      if (result.data.Status) {
        location.reload(Navigate("/auth/admin/dashboard/employee"))
      
      } else {
        alert(result.data.Error)
      }
    }
     )
   }

 


  return (
    <div className={styles.container}>
       <div className='px-5 mt-3 border'>
          <div className='d-flex justify-content-center my-3 '>
              <h5>Employee List</h5>
          </div>
        
        <div className='shadow rounded border-1 d-flex justify-content-center p-2'>
          <Link to="/auth/admin/dashboard/addemployee" className='btn btn-success py-2 mx-4'>ADD Employee</Link>
          <input type="text" className='w-50 p-2 rounded border-1' name="searchname" placeholder='Search Name' onChange={(e)=>setSearchName(e.target.value)}/> 
           
            
          </div>
          <div className='mt-3 '>
            <table className='table table-bordered'>
              <thead className={styles.table_head}>
                <tr>
                <th>
                    Sr.No.
                  </th>
                  <th>
                    Name
                  </th>
                  <th>
                    Email
                  </th>
                  <th>
                    Category
                  </th>
                  <th>
                    Salary
                  </th>
                  <th>
                    Address
                  </th>
                  <th>
                    Image
                  </th>
                  <th>
                    Action
                  </th>
                </tr>
              </thead>
            <tbody>
              { employee.map((emp, id) => {
                    return (<>
                      <tr key={id} className="">

                        <td className=''>
                          {id + 1}
                        </td>
                        <td className=''>
                          {emp.name}
                        </td>
                        <td className='' >
                          {emp.email}
                        </td>
                        <td className='' >
                          {emp.category}
                        </td>
                        <td className=''>
                          {emp.salary}
                        </td>
                        <td >
                          {emp.address}
                        </td>
                        <td className='p-0' >
                          <img src={`http://localhost:8000/images/` + emp.image} alt="" className={styles.employee_image} />
                        </td>
                        <td className='p-0' >
                          <Link to={`/auth/admin/dashboard/editemployee/` + emp.id} className='btn btn-primary btn-sm m-2'>Edit</Link>
        
                          <button className='btn btn-danger btn-sm' onClick={() => handleDelete(id)}>Delete</button>
                        </td>
                      </tr>
    
                    </>
                    )
                  })
                } 
              </tbody>
            </table>
          </div>
            </div>
    </div>
  )
}

//.filter(names => names.name.includes(`${searchName}`))
