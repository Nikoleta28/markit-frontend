import React from 'react';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import StudentProfile from '../components/StudentComponents/StudentProfile';
import StudentCourses from '../components/StudentComponents/StudentCourses';
import StudentPlan from '../components/StudentComponents/StudentPlan';
import StudentStatistics from '../components/StudentComponents/StudentStatistics';

function StudentMainPage(){

    
const [studentComp,setStudentComp] = useState('home');

const showStudentComponent= (compType) => {
  setStudentComp(compType);
}


    return(
       
        <div className="inAppBody">
            <nav class="sidebar">
                <header class="logo">
                    <div class="smallLogoBox">
                        <svg class="smalllogoIcon" width="55" height="55" viewBox="0 0 48 48"><g fill="none" stroke="#17252A" stroke-linejoin="round" stroke-width="2"><path d="M10 6a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v36a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V6Z"/><path stroke-linecap="round" d="M34 6v36M6 14h8M6 24h8M6 34h8M27 4h12M27 44h12"/></g></svg>
                        <h1 class="smallAppName">Mark it</h1>
                    </div>
                </header>

                <ul>
                    <li>
                        <button onClick={() => showStudentComponent('profile')} >
                        <svg width="22" height="22" viewBox="0 0 32 32"><path fill="currentColor" d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7zm10 28h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zm0-26h10v2H22zm0 5h10v2H22zm0 5h7v2h-7z"/></svg>
                        <p>Το προφίλ μου</p>
                        </button>
                    </li>  
                    <li>
                        <button onClick={() => showStudentComponent('courses')}>
                            <svg width="22" height="22" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586Z"/></svg>
                            <p>Μαθήματα</p>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => showStudentComponent('plan')}>
                        <svg width="21" height="21" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="4"><path stroke-linejoin="round" d="M5 19h38v22a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V19Zm0-9a2 2 0 0 1 2-2h34a2 2 0 0 1 2 2v9H5v-9Z"/><path stroke-linecap="round" stroke-linejoin="round" d="m16 31l6 6l12-12"/><path stroke-linecap="round" d="M16 5v8m16-8v8"/></g></svg>
                            <p>Το πλάνο μου</p>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => showStudentComponent('statistics')}>
                        <svg width="21" height="21" viewBox="0 0 26 26"><path fill="currentColor" d="M12.906-.031a1 1 0 0 0-.125.031A1 1 0 0 0 12 1v1H3a3 3 0 0 0-3 3v13c0 1.656 1.344 3 3 3h9v.375l-5.438 2.719a1.006 1.006 0 0 0 .875 1.812L12 23.625V24a1 1 0 1 0 2 0v-.375l4.563 2.281a1.006 1.006 0 0 0 .875-1.812L14 21.375V21h9c1.656 0 3-1.344 3-3V5a3 3 0 0 0-3-3h-9V1a1 1 0 0 0-1.094-1.031zM2 5h22v13H2V5zm18.875 1a1 1 0 0 0-.594.281L17 9.563L14.719 7.28a1 1 0 0 0-1.594.219l-2.969 5.188l-1.219-3.063a1 1 0 0 0-1.656-.344l-3 3a1.016 1.016 0 1 0 1.439 1.44l1.906-1.906l1.438 3.562a1 1 0 0 0 1.812.125l3.344-5.844l2.062 2.063a1 1 0 0 0 1.438 0l4-4A1 1 0 0 0 20.875 6z"/></svg>
                            <p>Στατιστικά</p>
                        </button>
                    </li>
                    <li>
                        <button><svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3zm2-7h7v2H6v3l-5-4l5-4v3z"/></svg>
                            <p>Έξοδος</p>
                        </button>
                    </li>   
                </ul>
            </nav>

            <div class="mainBody">
               
            <div className='mainPageHeader'>
              <SearchBar/>
                <div class="icons">
                    <button onClick={()=>showStudentComponent('home')} id='headerIcon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454l-6 5.454V19z"/></svg>
                    </button> 
                    <button onClick={()=>showStudentComponent('profile')} id='headerIcon'>
                        <svg width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z"/><path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"/></g></svg>
                    </button>
                </div>
            </div> 
            
            <>

                { studentComp ==='home' &&
                    <div class="homeContainer">
                    <div class="courseListLinkBox">
                        <div class="boxHeaderSmall">
                            <div class="titleBoxSmall">
                                <div class="boxSVG">
                                 <svg width="25" height="25" viewBox="0 0 256 256"><path fill="#FFFFFF" d="M76 64a12 12 0 0 1 12-12h128a12 12 0 0 1 0 24H88a12 12 0 0 1-12-12Zm140 52H88a12 12 0 0 0 0 24h128a12 12 0 0 0 0-24Zm0 64H88a12 12 0 0 0 0 24h128a12 12 0 0 0 0-24ZM44 112a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm0-64a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm0 128a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z"/></svg>
                                </div>
                                <button onClick={()=>showStudentComponent('courses')} id="goToCourses">Τα μαθήματα μου</button>
                            </div>
                        </div>

                        <ul class="courseListSmallLink">
                            <li>ΠΟΙΟΤΗΤΑ ΛΟΓΙΣΜΙΚΟΥ</li>
                            <li>TΤΕΧΝΟΛΟΓΙΑ ΛΟΓΙΣΜΙΚΟΥ</li>
                        </ul>

                    </div>


                    <div class="calendarBox">
                        <div class="boxHeaderSmall">
                            <div class="titleBoxSmall">
                                <div class="boxSVG">
                                    <svg width="25" height="25" viewBox="0 0 512 512"><rect width="416" height="384" x="48" y="80" fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="32" rx="48"/><circle cx="296" cy="232" r="24" fill="#FFFFFF"/><circle cx="376" cy="232" r="24" fill="#FFFFFF"/><circle cx="296" cy="312" r="24" fill="#FFFFFF"/><circle cx="376" cy="312" r="24" fill="#FFFFFF"/><circle cx="136" cy="312" r="24" fill="#FFFFFF"/><circle cx="216" cy="312" r="24" fill="#FFFFFF"/><circle cx="136" cy="392" r="24" fill="#FFFFFF"/><circle cx="216" cy="392" r="24" fill="#FFFFFF"/><circle cx="296" cy="392" r="24" fill="#FFFFFF"/><path fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M128 48v32m256-32v32"/><path fill="none" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="32" d="M464 160H48"/></svg>
                                </div>
                                <label>Ημερολόγιο</label>
                            </div>
                        </div>
                    </div>


                </div>}


               { studentComp ==='profile' && <StudentProfile/>}
               
               { studentComp ==='courses' && <StudentCourses/>}

               { studentComp ==='plan' && <StudentPlan/>}

               { studentComp ==='statistics' && <StudentStatistics/>}


            </>




        </div>

        </div>

    );
}


export default StudentMainPage;