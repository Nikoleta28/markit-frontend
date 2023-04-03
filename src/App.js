
import React from "react";
import './styles.css';
import  Login  from "./Login";
import Register  from "./Register";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import ProfMainPage from "./pages/ProfMainPage";
import StudentMainPage from "./pages/StudentMainPage";
import SecrMainPage from "./pages/SecrMainPage";

function App() {
 
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) =>{
    setCurrentForm(formName);
  }

  const authenticated = "";
  const authenticatedUserId = "";


  return (
      <div className="App">

         <BrowserRouter>
            <Routes>
              <Route path="/" element={<Outlet />}/>
              <Route index element={
                <div>
                  <div className='startBody'>
                      <div className="largeLogoBox">
                          <svg className="largeLogoIcon" width="110" height="110" viewBox="0 0 48 48"><g fill="none" stroke="#17252A" stroke-linejoin="round" stroke-width="1.2"><path d="M10 6a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v36a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V6Z"/><path stroke-linecap="round" d="M34 6v36M6 14h8M6 24h8M6 34h8M27 4h12M27 44h12"/></g></svg>
                          <h1 class="largeAppName">Mark it</h1>
                      </div>
                  </div> 

                    {
                      currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
                    }
                </div>} />
                
              <Route path="professor" element={<ProfMainPage />} />
              <Route path="student" element={<StudentMainPage />} />
              <Route path="secretariat" element={<SecrMainPage />} />
              <Route path="*" element={<h1> 404</h1>} />
            </Routes>
         </BrowserRouter>


      </div>
  );
}

export default App;





