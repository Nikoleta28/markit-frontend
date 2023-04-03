import React from "react";
import { useState } from "react";

function StudentRegister(){

    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[uni,setUni] = useState('');
    const[recNum,setRecNum] = useState('');
    const[department,setDepartment] = useState('');
    const[fullname,setFullName] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email);
     }


  return(
    <div class="newAccCont">
        <span>Συμπλήρωσε τα παρακάτω πεδία</span>
        <form class="formreg">
        <div class="accForm">
            <input onChange={(e)=>setFullName(e.target.value)} value={fullname} type="text" placeholder="Ονοματεπώνυμο" required/>
            <input onChange={(e)=>setUni(e.target.value)} value={uni} type="text" placeholder="Πανεπιστήμιο" required/>
            <input onChange={(e)=>setDepartment(e.target.value)} value={department} type="text" placeholder="Τμήμα" required/>
            <input onChange={(e)=>setRecNum(e.target.value)} value={recNum} type="text" placeholder="Μητρώο" required/>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="E-mail" required/>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className="crtPswd" placeholder="Κωδικός" required/>
        </div>
        <button type="submit" className="newAccountBtn" >Δημιουργία Λογαριασμού</button>
        </form>       
    </div>
  );

}

export default StudentRegister;