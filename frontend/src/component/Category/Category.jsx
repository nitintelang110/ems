import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import styles from './Category.module.css';


export const Category = () => {

  const [category, setCategory] = useState([]);
  


useEffect(()=>{

  axios.get("http://localhost:8000/auth/addcategory").then(result=>{
    if (result.data.Status) {

      setCategory((result.data.Result))
    }else{
      alert(result.data.Error)
    }

  }).catch(err => console.log(err))
},[])

 
  const handleDelete = (id) => {
    axios.delete("http://localhost:8000/auth/delete_category/"+id).then(result => {
      if (result.data.Status) {
     
        location.reload()
      
      } else {
        alert(result.data.Error)
      }
    }
    )
    
    
   }


  return (
    <div className={styles.container}>

    <div className='px-5 mt-3 border'>
          <div className='d-flex justify-content-center '>
              <h3>Department List</h3>
          </div>
          <Link to="/auth/admin/dashboard/addcategory" className='btn btn-success'>Add Department</Link>
          <div className='mt-3 '>
            <table className='table'>
              <thead>
                <tr>
                <th>
                    Sr.No.
                  </th>
                  <th>
                    Name
                  </th>
                  <th>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
{category.map((c,id)=>{
  return(<>
<tr key={id}>

  <td className='w-25'>
  {id+1} 
  </td>
  <td >
  {c.name}
  </td>
  <td >
  <Link to={`/auth/admin/dashboard/editcategory/`+ c.id } className='btn btn-primary btn-sm'>Edit</Link>
  <button className='btn btn-danger btn-sm mx-3' onClick={()=>handleDelete(c.id)}>Delete</button>
  </td>
</tr>
</>
)
})}
              </tbody>
            </table>
          </div>
    </div>
    
    </div>
  )
}

 
