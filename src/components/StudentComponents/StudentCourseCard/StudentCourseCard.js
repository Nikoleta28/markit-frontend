import React from "react";
import { useState } from "react";
import StudentCourseExercises from "./CourseCardComponents/StudentCourseExercises";
import StudentStudyingHoursTable from "./CourseCardComponents/StudentStudyingHoursTable";
import StudentRankingPlace from "./CourseCardComponents/StudentRankingPlace";
import StudentPassPrediction from "./CourseCardComponents/StudentPassPrediction";
import StudentCourseFinalMark from "./CourseCardComponents/StudentCourseFinalMark";

function StudentCourseCard(){


    return(

    <div class="flexCard">

        <div class="firstColumn">

         <label id="courseName">ΤΕΧΝΟΛΟΓΙΑ ΛΟΓΙΣΜΙΚΟΥ</label>

            <StudentCourseExercises/>
         
            <StudentStudyingHoursTable/>
       </div>

       <div class="secondColumn">

            <StudentRankingPlace/>

            <StudentPassPrediction/>

           <StudentCourseFinalMark/>

        </div>


    </div>


    );
    
}

export default StudentCourseCard;