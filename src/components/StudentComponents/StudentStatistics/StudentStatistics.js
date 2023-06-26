import React, { useState ,useEffect } from "react";
import StudentAssignmentMarksStatistics from "./StudentStatisticsComponents/StudentAssignmentMarksStatistics";
import StudentFinalMarkStatistics from "./StudentStatisticsComponents/StudentFinalMarkStistics";
import StudentAssignmentMarksRanking from "./StudentStatisticsComponents/StudentAssignmentMarksRanking";
import StudentStudyHoursChart from "./StudentStatisticsComponents/StudentStudyHoursChart";


function StudentStatistics(){

    const studentId = localStorage.getItem("userId");
    const [courseList,setCourseList] = useState([]);
  
    useEffect(() => {
       const getStudentCourseList = async () => {
         try {
           const response = await fetch(`http://localhost:8080/mark-it/student/${studentId}/courseList`);
           const data = await response.json();
           setCourseList(data);

         } catch (error) {
           console.error("Error fetching student course list: ", error);
         }
       };
    
       getStudentCourseList();
     }, [studentId]);

    const [course,setCourse] = useState(null);
    const [courseName,setCourseName] = useState(null);
    //  const [courseId,setCourseId] = useState(null);

     function updateCourse(body){
        setCourse(body);
        console.log(body);
        getStudentFinalMarkRanking(body.id);
        getAssignmentMarkList(body.id);
        getStudentAssignmentMarksRanking(body.id);
        getStudentStudyHoursList(body.id);
        getStudentSum(body.id);
        getStudentStudyHoursSum(body.id);
        getstudentStudyHoursSumPosition(body.id);
     }

  
    function getCourseByName(e){
       
        e.preventDefault();
        console.log(courseName);

    fetch(`http://localhost:8080/mark-it/statistics/student/${studentId}/getCourseByName/${courseName}`, {
        method: 'GET', // Use the appropriate HTTP method
        headers: {
          'Content-Type': 'application/json', 
          'Access-Control-Allow-Origin' : '*'
        }
      })
        .then((response) => {
           if (response.ok) { // Check if the response is successful
             return response.json();
           } else {
             console.error("Error fetching students ranking: ", response.status);
           }
       })
       .then((body) => {
        updateCourse(body);
    });
  }


const [studentSum,setStudentSum] = useState(null);

function updateStudentSum(data){
 setStudentSum(data);
 console.log(studentSum);
}

    function getStudentSum(id){

      const courseId = id;

      fetch(`http://localhost:8080/mark-it/statistics/student/${studentId}/course/${courseId}/studentsRegisteredToTheCourse`, {
        method: 'GET', // Use the appropriate HTTP method
        headers: {
          'Content-Type': 'application/json', 
          'Access-Control-Allow-Origin' : '*'
        }
      })
        .then((response) => {
           if (response.ok) { // Check if the response is successful
             return response.json();
           } else {
             console.error("Error fetching students ranking: ", response.status);
           }
       })
       .then((body) => {
        updateStudentSum(body);
    });

    }


    const [asMarkList,setAssignmentMarkList] = useState([]);

    function updateAssList(data){
      setAssignmentMarkList(data);
      console.log(asMarkList);
   }

function  getAssignmentMarkList(id){

 const courseId = id;

  fetch(`http://localhost:8080/mark-it/statistics/student/${studentId}/course/${courseId}/assignmentMarkList`, {
        method: 'GET', // Use the appropriate HTTP method
        headers: {
          'Content-Type': 'application/json', 
          'Access-Control-Allow-Origin' : '*'
        }
      })
        .then((response) => {
          if (response.ok) { // Check if the response is successful
            return response.json();
          } else {
            console.error("Error fetching students ranking: ", response.status);
          }
      })
      .then((body) => {
        updateAssList(body);
    });

}

const [finalMarkRankingPosition,setFinalMarkRankingPosition] = useState();

function updateFinalMarkRankingPosition(body){
  setFinalMarkRankingPosition(body);
  console.log(body);
  
}

function getStudentFinalMarkRanking(id){
  const courseId = id;

  fetch(`http://localhost:8080/mark-it/statistics/student/${studentId}/course/${courseId}/finalMarkRanking`, {
              method: 'GET', // Use the appropriate HTTP method
              headers: {
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin' : '*'
              }
            })
              .then((response) => {
                 if (response.ok) { // Check if the response is successful
                   return response.json();
                 } else {
                   console.error("Error fetching students ranking: ", response.status);
                 }
             })
             .then((body) => {
              updateFinalMarkRankingPosition(body);
          });
}


const [assMarkRankingPosition,setAssMarkRankingPosition] = useState(null);

function updateAssMarkRankingPosition(body){
  setAssMarkRankingPosition(body);
  console.log(body);
  
}
      
  function getStudentAssignmentMarksRanking(id){

    const courseId = id;

    fetch(`http://localhost:8080/mark-it/statistics/student/${studentId}/course/${courseId}/ranking`, {
                method: 'GET', // Use the appropriate HTTP method
                headers: {
                  'Content-Type': 'application/json', 
                  'Access-Control-Allow-Origin' : '*'
                }
              })
                .then((response) => {
                   if (response.ok) { // Check if the response is successful
                     return response.json();
                   } else {
                     console.error("Error fetching students ranking: ", response.status);
                   }
               })
               .then((body) => {
                updateAssMarkRankingPosition(body);
            });
  }



  const [studyHoursList,setStudyHoursList] = useState([]);

function updateStudyHoursList(body){
  setStudyHoursList(body);
  console.log(body);
  
}
      
  function getStudentStudyHoursList(id){

    const courseId = id;

    fetch(`http://localhost:8080/mark-it/statistics/student/${studentId}/course/${courseId}/studyHoursDiagram`, {
                method: 'GET', // Use the appropriate HTTP method
                headers: {
                  'Content-Type': 'application/json', 
                  'Access-Control-Allow-Origin' : '*'
                }
              })
                .then((response) => {
                   if (response.ok) { // Check if the response is successful
                     return response.json();
                   } else {
                     console.error("Error fetching students ranking: ", response.status);
                   }
               })
               .then((body) => {
                updateStudyHoursList(body);
            });
  }



  const [studyHoursSum,setStudyHoursSum] = useState([]);

  function updateStudyHoursSum(body){
    setStudyHoursSum(body);
    console.log(body);
  }
        
    function getStudentStudyHoursSum(id){
      const courseId = id;
  
      fetch(`http://localhost:8080/mark-it/statistics/student/${studentId}/course/${courseId}/StudyHoursSum`, {
                  method: 'GET', // Use the appropriate HTTP method
                  headers: {
                    'Content-Type': 'application/json', 
                    'Access-Control-Allow-Origin' : '*'
                  }
                })
                  .then((response) => {
                     if (response.ok) { // Check if the response is successful
                       return response.json();
                     } else {
                       console.error("Error fetching students ranking: ", response.status);
                     }
                 })
                 .then((body) => {
                  updateStudyHoursSum(body)
              });
    }


    const [studyHoursSumPosition,setStudyHoursSumPosition] = useState([]);

    function updateStudyHoursSumPosition(body){
        setStudyHoursSumPosition(body);
      console.log(body);
    }

    function getstudentStudyHoursSumPosition(id){
      const courseId = id;
  
      fetch(`http://localhost:8080/mark-it/statistics/student/${studentId}/course/${courseId}/StudyHoursSumRanking`, {
                  method: 'GET', // Use the appropriate HTTP method
                  headers: {
                    'Content-Type': 'application/json', 
                    'Access-Control-Allow-Origin' : '*'
                  }
                })
                  .then((response) => {
                     if (response.ok) { // Check if the response is successful
                       return response.json();
                     } else {
                       console.error("Error fetching students ranking: ", response.status);
                     }
                 })
                 .then((body) => {
                  updateStudyHoursSumPosition(body);
              });
    }





    
    return(
        <div className="mainBox">
            <div className="boxHeader">
                    <div className="titleBox">
                        <div className="boxSVG">
                            <svg width="20" height="20" viewBox="0 0 26 26"><path fill="#FFFFFF" d="M12.906-.031a1 1 0 0 0-.125.031A1 1 0 0 0 12 1v1H3a3 3 0 0 0-3 3v13c0 1.656 1.344 3 3 3h9v.375l-5.438 2.719a1.006 1.006 0 0 0 .875 1.812L12 23.625V24a1 1 0 1 0 2 0v-.375l4.563 2.281a1.006 1.006 0 0 0 .875-1.812L14 21.375V21h9c1.656 0 3-1.344 3-3V5a3 3 0 0 0-3-3h-9V1a1 1 0 0 0-1.094-1.031zM2 5h22v13H2V5zm18.875 1a1 1 0 0 0-.594.281L17 9.563L14.719 7.28a1 1 0 0 0-1.594.219l-2.969 5.188l-1.219-3.063a1 1 0 0 0-1.656-.344l-3 3a1.016 1.016 0 1 0 1.439 1.44l1.906-1.906l1.438 3.562a1 1 0 0 0 1.812.125l3.344-5.844l2.062 2.063a1 1 0 0 0 1.438 0l4-4A1 1 0 0 0 20.875 6z"/></svg>
                        </div>
                        <span>Στατιστικά στοιχεία</span>
                    </div>
                    
            </div>
           <form  onSubmit={(e)=> getCourseByName(e)} className="statsCourse">
               <span>Μάθημα:</span>
                    <select  className="dropdown" id="statsCourseDrop" onChange={(e) =>setCourseName(e.target.value)}>
                        <option value="">Επιλέξτε μάθημα</option>
                            {courseList.map((course,index) => (
                                <option key={index} value={course.name} >
                                {course.name}
                                </option>
                            ))}
                </select>
                <button type="submit">Προβολή στατιστικών</button>
            </form>

            <div>
             
               {course!==null &&    
                <div className='fmRanking'>
                  <span>Στο μάθημα είναι εγγεγραμμένοι συνολικά<span className="positionNum">{studentSum}</span>φοιτητές.</span>
                </div> }

                {course!==null &&   studyHoursSum>0 && 
                  <div className='fmRanking' id="flx">
                    <span>Έχεις διαβάσει συνολικά<span className="positionNum">{studyHoursSum}</span>ώρες για αυτό το μάθημα
                   και βρίσκεσαι στην θέση νούμερο <span className="positionNum">{studyHoursSumPosition}</span>.</span>
                  </div> }

                {course!=null && studyHoursSum===0 &&
                  <div className='fmRanking'>
                      <span>Δεν έχεις προσθέσει ακόμη ώρες μελέτης για αυτό το μάθημα.</span>
                  </div> }            

               {course!==null  && <StudentFinalMarkStatistics finalMarkRankingPosition={finalMarkRankingPosition} /> }

               {course!==null &&  <StudentAssignmentMarksRanking  assMarkRankingPosition={assMarkRankingPosition} /> }

               {course!==null &&  asMarkList.length!==0 &&  <StudentAssignmentMarksStatistics asMarkList={asMarkList} /> }

               {course!==null && studyHoursList.length!==0 && <StudentStudyHoursChart studyHoursList={studyHoursList}/> }
              

            
            </div>
           


                  

        </div>

    );
}

export default StudentStatistics;