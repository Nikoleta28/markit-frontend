import React, { useState } from "react";
import './styles.css';
import App from "./App";
import Register from "./Register";
import  {Redirect}  from 'react-router-dom';



function Login(props){
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');


      const handleLogInSubmit =  (event) => {
        event.preventDefault();     
        fetch('http://localhost:8080/mark-it/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({email: email, password: password}),
          // mode: "no-cors",
        })
          .then((response) => {
            if (response.ok) {
              setLoggedIn(true);
              return response.json();
              
            //  const body = response.json();
            //  return response.json();
            }
            // throw new Error('Authentication failed');
            else if (response.status === 401 || response.status === 403) {
              throw new Error('Invalid email or password');
            } else {
              throw new Error('Unexpected error occurred');
            }
          })
          .then((body) => {

            console.log("Response body:", body);

          if (body.type === "student" || body.type === "professor" || body.type === "secretariat") {
            
            localStorage.setItem("userType", body.type);
            localStorage.setItem("loggedIn", true);

            if (body.type === "student") {
              localStorage.setItem("userId", body.studentId);
              window.location.href = "/student";
            } else if (body.type === "professor") {
              localStorage.setItem("userId", body.professorId);
              window.location.href = "/professor";
            } else if (body.type === "secretariat") {
              localStorage.setItem("userId", body.secretariatId);
              window.location.href = "/secretariat";
            }
          } else {
            throw new Error("Unknown user type");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Invalid email or password");
        });


      }     


    return(
      <>
          <div className="logInContainer">
            <span className="log">Είσοδος</span>
            <form className="formlog" onSubmit={handleLogInSubmit}>
              <div className="logInForm">
                  <input 
                    className="emailLogIn" 
                    type="email" 
                    placeholder="e-mail" 
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email} 
                    required/> 
                  <input 
                    className="passwordLogIn" 
                    type="password" 
                    placeholder="Κωδικός" 
                    onChange={(e)=>setPassword(e.target.value)} 
                    value={password}
                    required/>  
               </div>
                   <button type="submit" className="logInBtn">Σύνδεση</button>
            </form>
          </div>
          <div className="createAcc">
              <span className="notSignedIn">Δεν έχετε κάνει εγγραφή;</span> 
              <button onClick={() =>props.onFormSwitch('register')}>Δημιουργία Λογαριασμού</button>
          </div>
     </>
    );


}
    

export default Login;       


