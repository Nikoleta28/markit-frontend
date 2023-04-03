import React from "react";
import { useState } from "react";
import StudentCourseCard from "./StudentCourseCard/StudentCourseCard";

function StudentCourses(){

    const [showCourses,setShowCourses] = useState('yes');

    const [courseCard,setCourseCard] = useState(false);

    const showCourseCard= (e) => {
        setShowCourses('no');
        setCourseCard(e);
    }

    const showBackBtn=(e)=>{
        setShowCourses(e);
        setCourseCard(false);
    }

    return(

        <div class="mainBox">
            <div class="boxHeader">
                    <div class="titleBox">
                        <div class="boxSVG">
                        <svg width="25" height="25" viewBox="0 0 256 256"><path fill="#FFFFFF" d="M76 64a12 12 0 0 1 12-12h128a12 12 0 0 1 0 24H88a12 12 0 0 1-12-12Zm140 52H88a12 12 0 0 0 0 24h128a12 12 0 0 0 0-24Zm0 64H88a12 12 0 0 0 0 24h128a12 12 0 0 0 0-24ZM44 112a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm0-64a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm0 128a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z"/></svg>
                        </div>
                        <span>Τα μαθήματα μου</span>
                    </div>

                {courseCard &&
                    <div>
                    <button id="backBtn" onClick={()=> showBackBtn('yes')}>
                        <svg width="25" height="25" viewBox="0 0 24 24"><path fill="#FFFFFF" d="m12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2H7.825l5.6 5.6Z"/></svg>
                    </button>
                    </div>}
            </div>
    
        { showCourses==='yes' &&
          <>
            <ul class="courseList">
                <li>
                        ΤΕΧΝΟΛΟΓΙΑ ΛΟΓΙΣΜΙΚΟΥ
                            <div class="buttonsCourses">
                                <button class="svgLinkButton" onClick={()=> showCourseCard(true)}>
                                    <svg width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="m226.8 73.9l-44.7-44.7a19.8 19.8 0 0 0-28.2 0l-120 120a19.7 19.7 0 0 0-5.9 14.1V208a20.1 20.1 0 0 0 20 20h44.7a19.7 19.7 0 0 0 14.1-5.9l120-120a19.9 19.9 0 0 0 0-28.2ZM91 204H52v-39l84-84l39 39Zm101-101l-39-39l15-15l39 39Z"/></svg>
                                </button>
                                <button>
                                    <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074z"/></svg>
                                </button>
                            
                        </div>
                    </li>
            </ul>
            </>}


            {courseCard && <StudentCourseCard/>}

        </div>  

    );
}

export default StudentCourses;