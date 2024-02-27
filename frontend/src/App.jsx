import { useEffect } from 'react';
import './App.css'
import{ Admin }from './component/Admin/Admin'
import {Login} from './component/Login/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Home} from './component/Home/Home';
import {Employee} from './component/Employee/Employee';
import {Profile} from './component/Profile/Profile';
import{ Category} from './component/Category/Category';
import { Addcategory } from './component/Category/Addcategory';
import { Addemployee } from './component/Employee/Addemployee';
import { Editemployee } from './component/Employee/Editemployee';
import { Editcategory } from './component/Category/Editcategory';
import { StartLogin } from './component/StartLogin/StartLogin';
import { UserLogin } from './component/UserLogin/UserLogin';
import EmployeeDetails from './EmployeeDetails/EmployeeDetails';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';



function App() {


  
  return (
    <>
    <BrowserRouter>
    <Routes>
          <Route path='/' element={<StartLogin />} />
         
          <Route path="/admin" element={
           <Login />}></Route>
          <Route path='/user' element={<UserLogin />} />
          {/*here we are protecting our component */}
          <Route path="/employee_details/:id" element={<PrivateRoute><EmployeeDetails /></PrivateRoute>} /> 
           {/*here we are protecting our component */}
          <Route path="/auth/admin/dashboard" element={ <PrivateRoute><Admin /></PrivateRoute>}>
            <Route path="/auth/admin/dashboard" element={<Home />} /> 
            <Route path="/auth/admin/dashboard/employee" element={<Employee/>} />
            <Route path="/auth/admin/dashboard/category" element={<Category />}></Route>
            <Route path="/auth/admin/dashboard/profile" element={<Profile />} />
              <Route path="/auth/admin/dashboard/addcategory" element={<Addcategory/>} />  
              <Route path="/auth/admin/dashboard/addemployee" element={<Addemployee/>} /> 
              <Route path="/auth/admin/dashboard/editemployee/:id" element={<Editemployee/>} /> 
              <Route path="/auth/admin/dashboard/editcategory/:id" element={<Editcategory/>} /> 
          </Route>
          
    </Routes>
    </BrowserRouter>
    </>
  )
}     

export default App
