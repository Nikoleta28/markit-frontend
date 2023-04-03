import React, { useState } from "react";
import './styles.css';
import App from "./App";
import Register from "./Register";


function Login(props){
    

    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[studentlogin,setStudentLogIn] = useState("false");

  const handleSubmit = (e) =>{
     e.preventDefault();
     // Here i can make an API call to authenticate the user
     console.log(`Email: ${email}, Password: ${password}`);

     //fetch /login
     //

     //if extst
     //localStorage.setItem   ..... sessionstorage
     //redirect

  }

  
    return(
      <>
      
          <div className="logInContainer">
            <span className="log">Είσοδος</span>
            <form className="formlog" onSubmit={handleSubmit}>
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
              <span className="notSignedIn">Δεν έχεις κάνει εγγραφή;</span> 
              <button onClick={() =>props.onFormSwitch('register')}>Δημιουργία Λογαριασμού</button>
          </div>
    
     </>

 

    );
}
    

export default Login;       


