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
                <span className="pushbtn">Επιλέξτε ένα από τα παρακάτω:</span>
                <div className="accOptions">
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
             <button onClick={() => props.onFormSwitch('login')} > Έχετε ήδη λογαριασμό; Συνδεθείτε!</button>
            </div>
      
        </div>
       
    );
}

export default Register;