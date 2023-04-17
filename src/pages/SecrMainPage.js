import React from "react";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SecrCourses from "../components/SecrComponents/SecrCourses";
import SecrProfile from "../components/SecrComponents/SecrProfile";



function checkLoggedInUser() {
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("loggedIn");
  
    // Check if user type is correct
    const userType = localStorage.getItem("userType");
    if (userType !== "secretariat") {
      window.location.href = "/login";
      return;
    }
  
    // Check if user ID exists
    const userId = localStorage.getItem("userId");
    if (!userId) {
      window.location.href = "/login";
      return;
    }
  }


  function logOut (){
    localStorage.setItem("loggedIn", false);
    localStorage.setItem("userType", null);
    localStorage.setItem("userId", null);
    window.location.href = "/";
  }


function SecrMainPage(){

    checkLoggedInUser();

   
    const [secrComp,setSecrComp] = useState('profile');

    const showSecrComponent= (compType) => {
    setSecrComp(compType);
    }

    return(
        <div className="inAppBody">

            <nav className="sidebar">
                <header className="logo">
                    <div className="smallLogoBox">
                        <svg className="smalllogoIcon" width="55" height="55" viewBox="0 0 48 48"><g fill="none" stroke="#17252A" strokeLinejoin="round" strokeWidth="2"><path d="M10 6a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v36a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V6Z"/><path strokeLinecap="round" d="M34 6v36M6 14h8M6 24h8M6 34h8M27 4h12M27 44h12"/></g></svg>
                        <h1 className="smallAppName">Mark it</h1>
                    </div>
                </header>

                <ul>
                    <li>
                        <button onClick={() => showSecrComponent('profile')} >
                        <svg width="22" height="22" viewBox="0 0 32 32"><path fill="currentColor" d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7zm10 28h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zm0-26h10v2H22zm0 5h10v2H22zm0 5h7v2h-7z"/></svg>
                        <p>Το προφίλ μου</p>
                        </button>
                    </li>  
                    <li>
                        <button onClick={() => showSecrComponent('courses')}>
                            <svg width="22" height="22" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586Z"/></svg>
                            <p>Μαθήματα</p>
                        </button>
                    </li>
                    <li>
                        <button onClick={()=> logOut() }>
                            <svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3zm2-7h7v2H6v3l-5-4l5-4v3z"/></svg>
                            <p>Έξοδος</p>
                        </button>
                    </li> 

                </ul>
            </nav>
            <div className="mainBody">
                { secrComp ==='profile' && <SecrProfile/>}
                { secrComp ==='courses' && <SecrCourses/>} 
            </div>
    </div>
     );
}

export default SecrMainPage;