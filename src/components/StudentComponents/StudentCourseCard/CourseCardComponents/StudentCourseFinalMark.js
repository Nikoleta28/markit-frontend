import React from "react";
import { useState , useEffect } from "react";

function StudentCourseFinalMark(props){

  const { updateStudyHoursAverage } = props;
  const { updateStudyHoursMAX } = props;
  const { updateStudyHoursMIN } = props;

    const courseId = localStorage.getItem("studentCourseId");
    const studentId = localStorage.getItem("userId");


    // const [editMark,setEditMark] =  useState(false);

    // const showEditForm = (e) => {
    //   setEditMark(e);
    // }

    const [finalMarkAdded,setFinalMarkAdded] = useState();
    const [finalMark,setFinalMark] = useState({});
    // const [initialMark,setInitialMark] = useState(null);

    useEffect(() => {
      const getStudentFinalMark = async () => {
        try {
          const response = await fetch(`http://localhost:8080/mark-it/student/${studentId}/course/${courseId}/finalMark`);
          const data = await response.json();
          setFinalMark(data);
          console.log(data);
          console.log(finalMark);

          // if(data.id!= null && data.mark!=null ){
          //   setFinalMarkAdded(true);
          //   console.log(finalMarkAdded);
          //   console.log(finalMark);
          // }else{
          //   setFinalMarkAdded(false);
          // }
        } catch (error) {
          console.error("Error fetching student's final mark: ", error);
        }
      };
   
      getStudentFinalMark();
    }, [studentId]);


const [addFinalMark,setAddFinalMark] = useState(false);


function changeMarkState(body){
  setFinalMark(body);
  updateGeneralStHours();
}

// function handleAddFinalMark(){
//   addFinalMark(true);
// }

const addFinalMarkToStudent= (e) => {
  e.preventDefault();     

  const mark = e.target[0].value;
  console.log(mark);

  fetch(`http://localhost:8080/mark-it/student/${studentId}/course/${courseId}/addFinalMark`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'
      , 'Access-Control-Allow-Origin' : '*'
     },
      body: JSON.stringify({mark:mark}),
    })
      .then((response) => {
        if (response.ok) {

          return response.json();
          // const data = response.json();
          // console.log(data);
          // setFinalMark(data);
          // console.log(finalMark);
          // // setFinalMarkAdded(true);
          
          // alert('Ο τελικός βαθμός προστέθηκε!');
          // setAddFinalMark(false);
          
        }
      })
      .then((body) => {
        setFinalMark(body);
        alert('Ο τελικός βαθμός προστέθηκε!');
        setAddFinalMark(false);
        changeMarkState(body);

    })
    .catch((error) => {
      console.error(error);
    });

   
}


const deleteFinalMark = (mark) => {
   
  console.log(mark);
  alert('Θέλετε να διαγράψετε σίγουρα τον τελικό βαθμό;');

  fetch( `http://localhost:8080/mark-it/student/${studentId}/course/${courseId}/deleteFinalMark`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' },
    body: JSON.stringify({mark:mark}),
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
      // console.log(finalMark);
      // setFinalMark({});
      changeMarkState(body);
      
  })
  .catch((error) => {
    console.error(error);
  });

  // setFinalMark({
  //   ...finalMark,
  //   mark:null
  // });
  
}

function updateGeneralStHours(){

  fetch(`http://localhost:8080/mark-it/statistics/student/${studentId}/course/${courseId}/StudyHoursAverage`, {
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
    updateStudyHoursAverage(body);
});

fetch(`http://localhost:8080/mark-it/statistics/student/${studentId}/course/${courseId}/StudyHoursMAX`, {
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
  updateStudyHoursMAX(body);
});

fetch(`http://localhost:8080/mark-it/statistics/student/${studentId}/course/${courseId}/StudyHoursMIN`, {
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
  updateStudyHoursMIN(body);
});
}

    return(
        <div className="studentFinalMark">
            <div className="predictionHeaderSmall">
                    <div className="predictionTitleBoxSmall">
                        <span>Τελικός βαθμός</span>
                    </div>    
            </div>

            <div className="insertFinalMark">
             { addFinalMark === false &&
               <>
                <label className="finalMark">{finalMark.mark}</label>
                <button id="editCourseMark" onClick={() => setAddFinalMark(true) }>
                   <svg width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="m226.8 73.9l-44.7-44.7a19.8 19.8 0 0 0-28.2 0l-120 120a19.7 19.7 0 0 0-5.9 14.1V208a20.1 20.1 0 0 0 20 20h44.7a19.7 19.7 0 0 0 14.1-5.9l120-120a19.9 19.9 0 0 0 0-28.2ZM91 204H52v-39l84-84l39 39Zm101-101l-39-39l15-15l39 39Z"/></svg>
                </button> 
                  <button id="editCourseMark" onClick={()=> deleteFinalMark(finalMark.mark)}>
                     <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074z"/></svg>
                 </button>
              </> 
            }
              { addFinalMark===true &&
                <form onSubmit={e => addFinalMarkToStudent(e)}>
                  <input type="text" 
                          name="mark"
                          defaultValue={finalMark.mark}
                          placeholder="Τελικός βαθμός" 
                          required
                          />
                  <button id="saveCourseEdit" type="submit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 19V5a2 2 0 0 1 2-2h11.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 21 7.828V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M8.6 9h6.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6H8.6a.6.6 0 0 0-.6.6v4.8a.6.6 0 0 0 .6.6ZM6 13.6V21h12v-7.4a.6.6 0 0 0-.6-.6H6.6a.6.6 0 0 0-.6.6Z"/></g></svg>
                  </button>
                  <button onClick={() => setAddFinalMark(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7.7 16.3q.275.275.7.275q.425 0 .7-.275l2.9-2.9l2.925 2.925q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7L13.4 12l2.925-2.925q.275-.275.262-.688q-.012-.412-.287-.687q-.275-.275-.7-.275q-.425 0-.7.275L12 10.6L9.075 7.675Q8.8 7.4 8.388 7.412q-.413.013-.688.288q-.275.275-.275.7q0 .425.275.7l2.9 2.9l-2.925 2.925q-.275.275-.262.687q.012.413.287.688ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"/></svg>
                  </button>
                  </form>
              }
            </div>
       </div>
    );
}

export default StudentCourseFinalMark;