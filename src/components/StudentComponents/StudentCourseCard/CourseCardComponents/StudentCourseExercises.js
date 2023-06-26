import React from "react";
import { useState , useEffect } from "react";
import StudentCourseCard from "../StudentCourseCard";


const StudentCourseExercises = (props) => {

  const { updateAssMarksSum } = props;

  //  const {getStudentRanking} = props;

    const courseId = localStorage.getItem("studentCourseId");
    const studentId = localStorage.getItem("userId");

    // const [course,setCourse] = useState([]);
    const [asMarkList,setAssignmentMarkList] = useState([]);

    useEffect(() => {
        const getAssignmentMarkList = async () => {
          try {
            const response = await fetch(`http://localhost:8080/mark-it/student/${studentId}/course/${courseId}/assignmentMarkList`, {
                method: 'GET', 
                headers: {
                  'Content-Type': 'application/json', 
                  'Access-Control-Allow-Origin' : '*'
                }
              });
              if (response.ok) { 
                const data = await response.json();
                setAssignmentMarkList(data);
                console.log(asMarkList);
                getStudentAssMarksSum();
                // getStudentRanking();
              } else {
                console.error("we get response but its an error: ", response.status);
              }
            } catch (error) {
              console.error("Error fetching professor assignment list: ", error);
            }
          };
        getAssignmentMarkList();
      }, [studentId]);



      

      const [assMark,setAssMark] = useState(null);
      const [addNewMark,setAddNewMark] = useState(false);

      // const [editAssignMark,setEditAssignMark] = useState(false);

      const [editingAssignmentMarkId,setEditingAssignmentMarkId] = useState(null);
    
    function handleAddAssignmentMark(assignmentMark){
           setAddNewMark(true);
           setEditingAssignmentMarkId(assignmentMark.id);
    }
     
   const addAssignmentMark = (e)=>{

        e.preventDefault();     
        // console.log(assMark);
        // console.log(editingAssignmentMarkId);

        fetch(`http://localhost:8080/mark-it/student/${studentId}/course/${courseId}/assignment/${editingAssignmentMarkId}/addAssignmentMark`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'
          , 'Access-Control-Allow-Origin' : '*'
         },
          body: JSON.stringify({mark:assMark}),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();    

            }
          })
          .then((body)=> {

            alert('Ο βαθμός προστέθηκε!');
            setAddNewMark(false);
            setEditingAssignmentMarkId(null);
            changeArrayState(body);
            getStudentAssMarksSum();
            // getStudentRanking();
        })
        .catch((error) => {
          console.error(error);
        });
      }
  

    function changeArrayState(body){
      setAssignmentMarkList(body);
    }

      function handleCancelAdd(e) {
          // setEditAssignMark(false);
          setAddNewMark(false);
          setEditingAssignmentMarkId(null);
      }


    const [assignName,setAssignName] = useState(undefined);

      const deleteAssignmentMark = (assignmentMark) => {
   
        // setAssignName(assignmentMark.assignmentName);
        console.log(assignmentMark.assignmentName);
        alert('Θέλετε να διαγράψετε σίγουρα αυτό τον βαθμό;');
      
        fetch( `http://localhost:8080/mark-it/student/${studentId}/course/${courseId}/assignment/deleteAssignmentMark`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' },
          body: JSON.stringify({id:assignmentMark.id ,mark:assignmentMark.mark, assignmentName : assignmentMark.assignmentName}),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
         
            }else {
              throw new Error('Unexpected error occurred');
            }
          })
          .then((body) => {
            console.log("Response body:", body);
            alert('Ο βαθμός διαγράφηκε!');
            setEditingAssignmentMarkId(null);
            changeArrayState(body);
            getStudentAssMarksSum();
            // getStudentRanking();
        })
        .catch((error) => {
          console.error(error);
        });
       
      }


  // const {updateRankingPosition} = props;
      
  // function getStudentRanking(){

  //   fetch(`http://localhost:8080/mark-it/student/${studentId}/course/${courseId}/ranking`, {
  //               method: 'GET', // Use the appropriate HTTP method
  //               headers: {
  //                 'Content-Type': 'application/json', 
  //                 'Access-Control-Allow-Origin' : '*'
  //               }
  //             })
  //               .then((response) => {
  //                  if (response.ok) { // Check if the response is successful
  //                    return response.json();
  //                  } else {
  //                    console.error("Error fetching students ranking: ", response.status);
  //                  }
  //              })
  //              .then((body) => {
  //               updateRankingPosition(body);
  //           });
  // }


  function getStudentAssMarksSum(){

    fetch(`http://localhost:8080/mark-it/statistics/student/${studentId}/course/${courseId}/AssignmentMarksSum`, {
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
                updateAssMarksSum(body);
            });
  }




    return(

        <div className="stdntExercises">
                <table className="stdCourseExTable">
                    <thead className="courseTableHeader">
                      <tr className="tableHeader">
                           <th>Εργασίες</th>
                           <th>Βαθμός</th>
                           <th></th>
                      </tr>
                    </thead>
                    <tbody >
                         {asMarkList.map((assignmentMark,index) => (
                                  <React.Fragment key={assignmentMark.id}>
                                      {  addNewMark===false && 
                                        <tr  >
                                          <td>{assignmentMark.assignmentName}</td>
                                          <td>{assignmentMark.mark}</td>
                                          <td>
                                           <button id="editCourseMark" onClick={() => handleAddAssignmentMark(assignmentMark)}>
                                              <svg width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="m226.8 73.9l-44.7-44.7a19.8 19.8 0 0 0-28.2 0l-120 120a19.7 19.7 0 0 0-5.9 14.1V208a20.1 20.1 0 0 0 20 20h44.7a19.7 19.7 0 0 0 14.1-5.9l120-120a19.9 19.9 0 0 0 0-28.2ZM91 204H52v-39l84-84l39 39Zm101-101l-39-39l15-15l39 39Z"/></svg>
                                            </button>
                                          
                                            <button id="editCourseMark" onClick={()=> deleteAssignmentMark(assignmentMark)}>
                                              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074z"/></svg>
                                            </button> 
                                            </td>
                                          </tr>

                                         }

                                    {addNewMark === true && editingAssignmentMarkId===assignmentMark.id &&
                                      <tr className="newCourse" >
                                          <td>{assignmentMark.assignmentName}</td>
                                          <td><input  className="mark"
                                                      type="text" 
                                                      name="mark"
                                                      defaultValue={assignmentMark.mark}
                                                      placeholder="Βαθμός" 
                                                      onChange={(e)=>setAssMark(e.target.value)}
                                                      /> </td>
                                          <td>
                                              <button id="saveCourseEdit" onClick={(e) => addAssignmentMark(e)}>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 19V5a2 2 0 0 1 2-2h11.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 21 7.828V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M8.6 9h6.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6H8.6a.6.6 0 0 0-.6.6v4.8a.6.6 0 0 0 .6.6ZM6 13.6V21h12v-7.4a.6.6 0 0 0-.6-.6H6.6a.6.6 0 0 0-.6.6Z"/></g></svg>
                                              </button>
                                              <button onClick={(e) => handleCancelAdd(e)}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7.7 16.3q.275.275.7.275q.425 0 .7-.275l2.9-2.9l2.925 2.925q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7L13.4 12l2.925-2.925q.275-.275.262-.688q-.012-.412-.287-.687q-.275-.275-.7-.275q-.425 0-.7.275L12 10.6L9.075 7.675Q8.8 7.4 8.388 7.412q-.413.013-.688.288q-.275.275-.275.7q0 .425.275.7l2.9 2.9l-2.925 2.925q-.275.275-.262.687q.012.413.287.688ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"/></svg>
                                              </button>
                                          </td>
                                      </tr>
                                    }     

                                     </React.Fragment>
                        ))}
                     </tbody>
                </table>
            </div>

    );
}

export default StudentCourseExercises;