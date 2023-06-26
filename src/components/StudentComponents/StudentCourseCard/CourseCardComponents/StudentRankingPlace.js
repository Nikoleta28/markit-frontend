import React, { useState } from "react";
import {  useEffect } from "react";

function StudentRankingPlace(props){

  const {assMarkSum} = props;

    const courseId = localStorage.getItem("studentCourseId");
    const studentId = localStorage.getItem("userId");

    // const [position,setPosition] = useState(null);

    // function changePositionState(data){
    //     setPosition(data);
    //   }


    //  useEffect(() => {
    //   const getStudentRanking = async () => {
    //     try {
    //       const response = await fetch(`http://localhost:8080/mark-it/student/${studentId}/course/${courseId}/ranking`);
    //       const data = await response.json();
    //      console.log(courseId);
    //      changePositionState(data);
       
    //     } catch (error) {
    //       console.error("Error fetching student's final mark: ", error);
    //     }
    //   };
   
    //   getStudentRanking();
    // }, [studentId]);
    


    return(

        <div className="studentRating">
            <div className="hoursHeaderSmall">
                    <div className="hoursTitleBoxSmall">
                        <span>Σύνολο εργασιών</span>
                    </div>    
            </div>
            { assMarkSum!=-1 &&
                <p className="rankingText">Η συνολική βαθμολογία που συγκέντρωσες από τις εργασίες του μαθήματος είναι: 
                <span className="positionNum">{assMarkSum}</span> !
             </p>}
             { assMarkSum==-1 &&
                 <p className="rankingText">Δεν διατίθεται σύνολο βαθμολογιών. </p>
             }
       </div>

    );
    
}

export default StudentRankingPlace;