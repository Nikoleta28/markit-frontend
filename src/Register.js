import React from "react";
import './styles.css';
import { useState } from "react";
import StudentRegister from "./registerForms/StudentRegister";
import ProfRegister from "./registerForms/ProfRegister";
import SecrRegister from "./registerForms/SecrRegister";


function Register(props){

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

              { accountForm==='stdnt' && <StudentRegister/> }

              { accountForm==='profsr' && <ProfRegister/>}

              { accountForm==='secrt' &&<SecrRegister/> }

             </>
             
            <div className="goToLogInBtn">
             <button onClick={() => props.onFormSwitch('login')} > Έχεις ήδη λογαριασμό; Συνδέσου!</button>
            </div>
      
        </div>
       
    );
}

export default Register;