import React from "react";
import { useState, useEffect } from "react";

function StudentRegister(){

  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    // Fetch the list of universities from the server or API
    fetch('http://localhost:8080/mark-it/secretariat/universities')
      .then(response => response.json())
      .then(data => setUniversities(data))
      .catch(error => console.error('Error fetching universities:', error));
  }, []);

  const [departments,setDepartments] = useState([]);

  useEffect(() => {
    // Fetch the list of universities from the server or API
    fetch('http://localhost:8080/mark-it/secretariat/departments')
      .then(response => response.json())
      .then(data => setDepartments(data))
      .catch(error => console.error('Error fetching departments:', error));
  }, []);


    const registerStudent = (e) => {
      e.preventDefault();

      const fullName = e.target[0].value;
      const university = e.target[1].value;
      const department = e.target[2].value;
      const recordNum = e.target[3].value;
      const email = e.target[4].value;
      const password = e.target[5].value;
  
      // send the updated data to the server 
      fetch('http://localhost:8080/mark-it/student/newStudent', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
      },
      body: JSON.stringify({
      fullName: fullName,
      university:university,
      department: department,
      recordNum : recordNum,
      email:email,
      password:password})
      })
      // .then(response => response.json())
      .then((response) => {
          if (response.ok) {
              console.log(response);    
            return response;    
            
          }else{
            alert("Το email ή ο αριθμός μητρώου που συμπληρώσατε υπάρχουν ήδη! ");
          }
        })
          
      .then(data => {
          console.log('Professor registered successfully:', data);
          window.location.href = "/";
      })
      .catch(error => {
          console.error('Error updating secretariat data:', error);
      });

      // window.location.href = "/";
  }


  return(
    <div className="newAccCont">
        <span>Συμπληρώστε τα παρακάτω πεδία</span>
        <form className="formreg" onSubmit={e => registerStudent(e)}>
        <div className="accForm">
            <input type="text" placeholder="Ονοματεπώνυμο" required/>
            <select className="dropdown" id="register" >
              {universities.map((university,index) => (
                <option key={index} value={university} >
                  {university}
                </option>
              ))}
          </select>
          <select className="dropdown" id="register" >
            {departments.map((department,index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
            <input type="text" placeholder="Μητρώο" required/>
            <input type="email" placeholder="E-mail" required/>
            <input type="text" className="crtPswd" placeholder="Κωδικός" required/>
        </div>
        <button type="submit" className="newAccountBtn" >Δημιουργία Λογαριασμού</button>
        </form>       
    </div>
  );

}

export default StudentRegister;