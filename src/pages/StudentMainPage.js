import React, { useLayoutEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import StudentProfile from '../components/StudentComponents/StudentProfile';
import StudentCourses from '../components/StudentComponents/StudentCourses';
import StudentPlan from '../components/StudentComponents/StudentPlan';
import StudentStatistics from '../components/StudentComponents/StudentStatistics/StudentStatistics';
import StudentCalendar from '../components/StudentComponents/StudentCalendar';

import { useEffect } from "react";

function checkLoggedInUser() {
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("loggedIn");
  
    // Check if user type is correct
    const userType = localStorage.getItem("userType");
    if (userType !== "student") {
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



function StudentMainPage(){

    checkLoggedInUser();

    const [studentComp,setStudentComp] = useState('home');

    const showStudentComponent= (compType) => {
    setStudentComp(compType);
    }

    const studentId = localStorage.getItem("userId");
    const [courseList,setCourseList] = useState([]);
  
    useEffect(() => {
       const getStudentCourseList = async () => {
         try {
           const response = await fetch(`http://localhost:8080/mark-it/student/${studentId}/courseList`);
           const data = await response.json();
           setCourseList(data);

         } catch (error) {
           console.error("Error fetching professor course list: ", error);
         }
       };
    
       getStudentCourseList();
     }, [studentId]);
    


     const updateArray = (newArray) => {
        setCourseList(newArray);
      };

    return(
       
        <div className="inAppBody">
            <nav className="sidebar">
                <header className="logo">
                    <div className="smallLogoBox">
                        <svg className="smalllogoIcon" width="55" height="55" viewBox="0 0 48 48"><g fill="none" stroke="#17252A" strokeLinejoin="round" strokeWidth="2"><path d="M10 6a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v36a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V6Z"/><path strokeinecap="round" d="M34 6v36M6 14h8M6 24h8M6 34h8M27 4h12M27 44h12"/></g></svg>
                        <h1 className="smallAppName">Mark it</h1>
                    </div>
                </header>

                <ul>
                    <li>
                        <button onClick={()=>showStudentComponent('home')} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454l-6 5.454V19z"/></svg>
                        <p>Αρχική</p>
                        </button> 
                    </li>
                    <li>
                        <button onClick={() => showStudentComponent('profile')} >
                        <svg width="22" height="22" viewBox="0 0 32 32"><path fill="currentColor" d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7zm10 28h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zm0-26h10v2H22zm0 5h10v2H22zm0 5h7v2h-7z"/></svg>
                        <p>Το προφίλ μου</p>
                        </button>
                    </li>  
                    <li>
                        <button onClick={() => showStudentComponent('courses')}>
                            <svg width="22" height="22" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586Z"/></svg>
                            <p>Μαθήματα</p>
                        </button>
                    </li>
                    {/* <li>
                        <button onClick={() => showStudentComponent('plan')}>
                        <svg width="21" height="21" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" strokeWidth="4"><path strokeLinejoin="round" d="M5 19h38v22a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V19Zm0-9a2 2 0 0 1 2-2h34a2 2 0 0 1 2 2v9H5v-9Z"/><path strokeLinecap="round" strokeLinejoin="round" d="m16 31l6 6l12-12"/><path strokeLinecap="round" d="M16 5v8m16-8v8"/></g></svg>
                            <p>Το πλάνο μου</p>
                        </button>
                    </li> */}
                    <li>
                        <button onClick={() => showStudentComponent('statistics')}>
                        <svg width="21" height="21" viewBox="0 0 26 26"><path fill="currentColor" d="M12.906-.031a1 1 0 0 0-.125.031A1 1 0 0 0 12 1v1H3a3 3 0 0 0-3 3v13c0 1.656 1.344 3 3 3h9v.375l-5.438 2.719a1.006 1.006 0 0 0 .875 1.812L12 23.625V24a1 1 0 1 0 2 0v-.375l4.563 2.281a1.006 1.006 0 0 0 .875-1.812L14 21.375V21h9c1.656 0 3-1.344 3-3V5a3 3 0 0 0-3-3h-9V1a1 1 0 0 0-1.094-1.031zM2 5h22v13H2V5zm18.875 1a1 1 0 0 0-.594.281L17 9.563L14.719 7.28a1 1 0 0 0-1.594.219l-2.969 5.188l-1.219-3.063a1 1 0 0 0-1.656-.344l-3 3a1.016 1.016 0 1 0 1.439 1.44l1.906-1.906l1.438 3.562a1 1 0 0 0 1.812.125l3.344-5.844l2.062 2.063a1 1 0 0 0 1.438 0l4-4A1 1 0 0 0 20.875 6z"/></svg>
                            <p>Στατιστικά</p>
                        </button>
                    </li>
                    <li>
                        <button onClick={()=> logOut() }>
                            <svg width="22" height="21" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3zm2-7h7v2H6v3l-5-4l5-4v3z"/></svg>
                            <p>Έξοδος</p>
                        </button>
                    </li>   
                </ul>
            </nav>

            <div className="mainBody">
               
            <>

                { studentComp ==='home' &&

                <div className="homeContainer">
                        
                    <div className="calendarBox">
                        <div className="boxHeaderSmall">
                            <div className="titleBoxSmall">
                                <div className="boxSVG">
                                    <svg width="25" height="25" viewBox="0 0 512 512"><rect width="416" height="384" x="48" y="80" fill="none" stroke="#FFFFFF" strokeLinejoin="round" strokeWidth="32" rx="48"/><circle cx="296" cy="232" r="24" fill="#FFFFFF"/><circle cx="376" cy="232" r="24" fill="#FFFFFF"/><circle cx="296" cy="312" r="24" fill="#FFFFFF"/><circle cx="376" cy="312" r="24" fill="#FFFFFF"/><circle cx="136" cy="312" r="24" fill="#FFFFFF"/><circle cx="216" cy="312" r="24" fill="#FFFFFF"/><circle cx="136" cy="392" r="24" fill="#FFFFFF"/><circle cx="216" cy="392" r="24" fill="#FFFFFF"/><circle cx="296" cy="392" r="24" fill="#FFFFFF"/><path fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M128 48v32m256-32v32"/><path fill="none" stroke="#FFFFFF" strokeLinejoin="round" strokeWidth="32" d="M464 160H48"/></svg>
                                </div>
                                <label>Ημερολόγιο εργασιών</label>
                            </div>
                        </div>

                        <StudentCalendar/>
                    </div>

                    <div className="courseListLinkBox">
                        <div className="boxHeaderSmall">
                            <div className="titleBoxSmall">
                                <div className="boxSVG">
                                <svg width="25" height="25" viewBox="0 0 256 256"><path fill="#FFFFFF" d="M76 64a12 12 0 0 1 12-12h128a12 12 0 0 1 0 24H88a12 12 0 0 1-12-12Zm140 52H88a12 12 0 0 0 0 24h128a12 12 0 0 0 0-24Zm0 64H88a12 12 0 0 0 0 24h128a12 12 0 0 0 0-24ZM44 112a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm0-64a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm0 128a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z"/></svg>
                                </div>
                                <button onClick={()=>showStudentComponent('courses')} id="goToCourses">Τα μαθήματα μου</button>
                            </div>
                        </div>

                        {courseList.map((course,index) => (
                            <React.Fragment key={course.id}>
                                <ul className="courseList">
                                    <li>
                                    <span>{course.name}</span> 
                                    </li>
                                </ul>
                            </React.Fragment>
                        ))}
                    
                    </div>

                </div>



            }


               { studentComp ==='profile' && <StudentProfile/>}
               
               { studentComp ==='courses' && <StudentCourses  updateArray={updateArray}/>}

               { studentComp ==='plan' && <StudentPlan/>}

               { studentComp ==='statistics' && <StudentStatistics/>}



               

           
               


            </>




        </div>

        </div>

    );
}


export default StudentMainPage;