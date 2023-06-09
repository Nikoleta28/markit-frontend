import React from "react";
import { useState } from "react";

function SecrRegister(){


    const registerSecretariat = (e) => {
        e.preventDefault();

        const university = e.target[0].value;
        const department = e.target[1].value;
        const email = e.target[2].value;
        const password = e.target[3].value;
    
        // send the updated data to the server 
        fetch('http://localhost:8080/mark-it/secretariat/newSecretariat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
        },
        body: JSON.stringify({
        university:university,
        department: department,
        email:email,
        password:password})
        })
        // .then(response => response.json())
        .then((response) => {
            if (response.ok) {
                console.log(response);    
              return response;    
              
            }})
        .then(data => {
            console.log('Secretariat registered successfully:', data);
            window.location.href = "/";
        })
        .catch(error => {
            console.error('Error updating secretariat data:', error);
        });

        window.location.href = "/";

    }


    return(
        <div className="newAccCont">
          <span>Συμπληρώστε τα παρακάτω πεδία</span>
          <form className="formreg" onSubmit={e => registerSecretariat(e)}>
           <div className="accForm">
              <input  type="text" placeholder="Πανεπιστήμιο" required/>
              <input  type="text" placeholder="Τμήμα" required/>
              <input  type="email" placeholder="E-mail" required/>
              <input  type="text" className="crtPswd" placeholder="Κωδικός" required/>
           </div>
           <button type="submit" className="newAccountBtn">Δημιουργία Λογαριασμού</button>
          </form>
        </div>
    );
}

export default SecrRegister;


