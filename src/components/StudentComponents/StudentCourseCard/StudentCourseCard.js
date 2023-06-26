import React from "react";
import { useState , useEffect } from "react";
import StudentCourseExercises from "./CourseCardComponents/StudentCourseExercises";
import StudentStudyingHoursTable from "./CourseCardComponents/StudentStudyingHoursTable";
import StudentRankingPlace from "./CourseCardComponents/StudentRankingPlace";
import StudentStudyHoursPrediction from "./CourseCardComponents/StudentStudyHoursPrediction";
import StudentCourseFinalMark from "./CourseCardComponents/StudentCourseFinalMark";

function StudentCourseCard(){


    const courseId = localStorage.getItem("studentCourseId");
    const studentId = localStorage.getItem("userId");

    const [course,setCourse] = useState([]);
    // const [rankingPosition,setRankingPosition] = useState(null);

    // const updateRankingPosition = (newPosition) => {
    //   setRankingPosition(newPosition);
    // }


    // useEffect(() => {
    //   const getStudentRanking = async () => {
    //     try {
    //       const response = await fetch(`http://localhost:8080/mark-it/student/${studentId}/course/${courseId}/ranking`);
    //       const data = await response.json();
    //      console.log(courseId);
    //      updatePosition(data);
       
    //     } catch (error) {
    //       console.error("Error fetching student's final mark: ", error);
    //     }
    //   };
   
    //   getStudentRanking();
    // }, [studentId]);


    const [assMarkSum,setAssMarksSum] = useState(null);

    const updateAssMarksSum = (newSum) => {
      setAssMarksSum(newSum);
    }

    useEffect(() => {
        const getStudentCourse = async () => {
          try {
            const response = await fetch(`http://localhost:8080/mark-it/student/${studentId}/course?courseId=${courseId}`, {
                method: 'GET', // Use the appropriate HTTP method
                headers: {
                  'Content-Type': 'application/json', 
                  'Access-Control-Allow-Origin' : '*'
                }
              });
              if (response.ok) { // Check if the response is successful
                const data = await response.json();
                setCourse(data);
                console.log(course);
              } else {
                console.error("Error fetching student's course: ", response.status);
              }
        
            } catch (error) {
              console.error("Error fetching student's course: ", error);
            }
          };
        getStudentCourse();
      }, [studentId]);


      const [studyHoursSum,setStudyHoursSum] = useState(null);

      const updateStudyHoursSum = (newSum) => {
        setStudyHoursSum(newSum);
      }

    const [studyHoursAverage,setStudyHoursAverage] = useState(null);

    const updateStudyHoursAverage = (newAverage) => {
      setStudyHoursAverage(newAverage);
    }

    const [studyHoursMAX,setStudyHoursMAX] = useState(null);

    const updateStudyHoursMAX = (newMAX) => {
      setStudyHoursMAX(newMAX);
    }

    const [studyHoursMIN,setStudyHoursMIN] = useState(null);

    const updateStudyHoursMIN = (newMIN) => {
      setStudyHoursMIN(newMIN);
    }








    return(
        <div className="flexCard">

            <div className="firstColumn">

            <label id="courseName">{course.name}</label>
                <StudentCourseExercises updateAssMarksSum={updateAssMarksSum}  />
                <StudentStudyingHoursTable updateStudyHoursSum={updateStudyHoursSum}  updateStudyHoursAverage={updateStudyHoursAverage} updateStudyHoursMAX={updateStudyHoursMAX } updateStudyHoursMIN={updateStudyHoursMIN} />
            </div>

          <div className="secondColumn">
             <StudentRankingPlace assMarkSum={assMarkSum} />
             <StudentStudyHoursPrediction studyHoursSum={studyHoursSum} studyHoursAverage={studyHoursAverage} studyHoursMAX={studyHoursMAX} studyHoursMIN={studyHoursMIN}/>
             <StudentCourseFinalMark updateStudyHoursAverage={updateStudyHoursAverage} updateStudyHoursMAX={updateStudyHoursMAX } updateStudyHoursMIN={updateStudyHoursMIN}/>
          </div>

        </div>
    );
    
}

export default StudentCourseCard;


//