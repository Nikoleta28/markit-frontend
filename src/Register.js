import React from "react";
import './styles.css';
import { useState } from "react";


function Register(props){

    //input states
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[uni,setUni] = useState('');
    const[idNum,setIdNum] = useState('');
    const[department,setDepartment] = useState('');
    const[fullname,setFullName] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email);
     }
    

    //account type states
    const [accountForm,setAccountForm] = useState('');

    const showForm = (accType) => {
      setAccountForm(accType);
    }
  
    return(

        <div>

                <span className="pushbtn">Επίλεξε ένα από τα παρακάτω:</span>
                <div class="accOptions">
                    <button onClick={()=> showForm('stdnt')} id="student">Μαθητής</button>
                    <button onClick={()=> showForm('profsr')} id="prof">Καθηγητής</button>
                    <button onClick={()=> showForm('secrt')} id="secr">Γραμματεία</button>
                </div>



             <>

              {  accountForm==='stdnt' &&
                <div class="newAccCont">
                    <span>Συμπλήρωσε τα παρακάτω πεδία</span>
                    <form class="formreg">
                      <div class="accForm">
                        <input onChange={(e)=>setFullName(e.target.value)} value={fullname} type="text" placeholder="Ονοματεπώνυμο" required/>
                        <input onChange={(e)=>setUni(e.target.value)} value={uni} type="text" placeholder="Πανεπιστήμιο" required/>
                        <input onChange={(e)=>setDepartment(e.target.value)} value={department} type="text" placeholder="Τμήμα" required/>
                        <input onChange={(e)=>setIdNum(e.target.value)} value={idNum} type="text" placeholder="Μητρώο" required/>
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="E-mail" required/>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className="crtPswd" placeholder="Κωδικός" required/>
                      </div>
                      <button type="submit" className="newAccountBtn" >Δημιουργία Λογαριασμού</button>
                    </form>       
                </div>
              }



              {
                accountForm==='profsr' &&
                <div class="newAccCont">
                    <span>Συμπλήρωσε τα παρακάτω πεδία</span>
                    <form class="formreg">
                     <div class="accForm">
                        <input onChange={(e)=>setFullName(e.target.value)} value={fullname} type="text" placeholder="Ονοματεπώνυμο" required/>
                        <input onChange={(e)=>setUni(e.target.value)} value={uni} type="text" placeholder="Πανεπιστήμιο" required/>
                        <input onChange={(e)=>setDepartment(e.target.value)} value={department} type="text" placeholder="Τμήμα" required/>
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="E-mail" required/>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="text" className="crtPswd" placeholder="Κωδικός" required/>
                     </div>
                     <button type="submit" className="newAccountBtn">Δημιουργία Λογαριασμού</button>
                    </form>  
                </div>
              }


              {
                accountForm==='secrt' &&
                <div class="newAccCont">
                    <span>Συμπλήρωσε τα παρακάτω πεδία</span>
                    <form class="formreg">
                     <div class="accForm">
                        <input onChange={(e)=>setUni(e.target.value)} value={uni} type="text" placeholder="Πανεπιστήμιο" required/>
                        <input onChange={(e)=>setDepartment(e.target.value)} value={department} type="text" placeholder="Τμήμα" required/>
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="E-mail" required/>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="text" className="crtPswd" placeholder="Κωδικός" required/>
                     </div>
                     <button type="submit" className="newAccountBtn">Δημιουργία Λογαριασμού</button>
                    </form>
                </div>

              }

             </>
             
            <div className="goToLogInBtn">
             <button onClick={() => props.onFormSwitch('login')} > Έχεις ήδη λογαριασμό; Συνδέσου!</button>
            </div>
      
        </div>
       
    );
}

export default Register;