import React , { useState } from "react";
import { useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import StudentEventCalendar from "./StudentEventCalendar";


function StudentStudyingHoursTable(props){

  const { updateStudyHoursSum } = props;
  const { updateStudyHoursAverage } = props;
  const { updateStudyHoursMAX } = props;
  const { updateStudyHoursMIN } = props;

    const studentId = localStorage.getItem("userId");
    const courseId = localStorage.getItem("studentCourseId");
    const [studyHours,setStudyHours] = useState([]);
  //  const [editedHours,setEditedHours] = useState({});
    const[syllabusList,setSyllabusList] = useState([]);
    const [selectedSyllabus, setSelectedSyllabus] = useState('');

    const [newSH,setNewSH] = useState({});


    function changeArrayState(body){
      // setStudyHours(body);

      const formattedStudyHours = body.map((studyHours) => ({
        ...studyHours,
        end: studyHours.start,
       
      }));

      setStudyHours(formattedStudyHours);
      getStudentStudyHoursSum();
      updateGeneralStHours();
    }

    useEffect(() => {
        const getStudentStudyHoursList = async () => {
          try {
            const response = await fetch(`http://localhost:8080/mark-it/student/${studentId}/course/${courseId}/studyHoursList`, {
                method: 'GET', // Use the appropriate HTTP method
                headers: {
                  'Content-Type': 'application/json', 
                  'Access-Control-Allow-Origin' : '*'
                }
              });
              if (response.ok) { // Check if the response is successful
                const data = await response.json();

                changeArrayState(data);

                // const formattedStudyHours = data.map((studyHours) => ({
                //   ...studyHours,
                //   end: studyHours.start,
                 
                // }));
      
                // setStudyHours(formattedStudyHours);
                // console.log(studyHours);

                // setAssignments(data);
                // console.log(assignments);
         
              } else {
                console.error("we get response but its an error: ", response.status);
              }
        
            } catch (error) {
              console.error("Error fetching professor assignment list: ", error);
            }
          };
     
          getStudentStudyHoursList();
      }, [studentId]);


      // useEffect(() => {
      //   const getCourseSyllabusList = async () => {
      //     try {
      //       const response = await fetch(`http://localhost:8080/mark-it/course/${courseId}/courseSyllabusList`);
      //       const data = await response.json();
      //       setSyllabusList(data);
 
      //     } catch (error) {
      //       console.error("Error fetching secretariat course list: ", error);
      //     }
      //   };
     
      //   getCourseSyllabusList();
      // }, [courseId]);
      
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [selectedDate, setSelectedDate] = useState(null);
      const [hours, setHours] = useState('');
      const [modalState,setModalState] = useState("");
      const [selectedStHours,setSelectedStHours] = useState({});
      
      // const handleDateClick = (arg) => {
      //   console.log(arg);
      //   setSelectedDate(arg.endStr);
      //   // setShowModal(true);
      // };
    
      // const handleCloseModal = () => {
      //   setShowModal(false);
      // };


      const handleSelect = (arg) => {


        console.log(arg);
        console.log(arg.startStr);

        setIsModalOpen(true);
        setSelectedDate(arg.startStr);

        // console.log(selectedDate);

        fetch(`http://localhost:8080/mark-it/student/${studentId}/course/${courseId}/studyHours/getStudyHours`, {
                method: 'POST', // Use the appropriate HTTP method
                headers: {
                  'Content-Type': 'application/json', 
                  'Access-Control-Allow-Origin' : '*'
                },
                body: JSON.stringify({
                  start: arg.startStr,
                  })
                })
              .then((response) => {
                if (response.ok) {
                    console.log(response);    
                  return response.json();    
                  
                }})
              .then((body) => {

                console.log("Response body:", body);
    
                if (body.check === "exists") {
                  setModalState("edit");
                  
                  setSelectedStHours(body.studyHours);
                 
                } else if (body.check === "notHere") {
                  setModalState("add");
                }

                
            })
              .catch(error => {
                console.error('Error :', error);
              });
       
             
        
      };
    
      const handleModalClose = () => {
        setIsModalOpen(false);
      };

      // const handleAlert = (hours) => {
      //   const result = window.confirm('Do you want to proceed?');
      //   if (result) {
      //     // OK button was clicked
          
      //     console.log('OK clicked');
      //     addStudyHours(hours)
      //   } else {
      //     // Cancel button was clicked or the alert was closed
      //     console.log('Cancel clicked');
      //   }
      // };

      const addStudyHours = (e) => {
        e.preventDefault();

        console.log(selectedSyllabus);

        fetch(`http://localhost:8080/mark-it/student/${studentId}/course/${courseId}/studyHours/addStudyHours` , {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' },
          body: JSON.stringify({
          date: selectedDate, 
          hours : hours,
          // id: selectedSyllabus,
          }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((body) => {
            console.log("Response body:", body);
            alert('Οι ώρες προστέθηκαν!');
            changeArrayState(body);
            setSelectedDate(null);
            setIsModalOpen(false);
              // setNewSH(body);
          // return  studyHours.push(newSH);

        })
        .catch((error) => {
          console.error(error);
        });
      }

      const [updateSH,setUpdateSH] = useState(false);

      function handleEditClick(stHours){
        console.log(stHours);
        setUpdateSH(true);
      }

      function handleCancelEdit() {
       setUpdateSH(false);
    }


    const handleSaveChange = (e) => {

      e.preventDefault();

      const editedHours =  e.target[0].value;

      const studyHoursId = selectedStHours.id;

      console.log(studyHoursId);
      console.log(selectedStHours);
      console.log(editedHours);

      fetch(`http://localhost:8080/mark-it/student/${studentId}/course/${courseId}/studyHours/${studyHoursId}/updateStudyHours`, {
       method: 'PUT',
       headers: {
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin' : '*'
       },
       body: JSON.stringify({
        start: selectedStHours.start,
        hours: editedHours,
       })
       })
       // .then(response => response.json())
       .then((response) => {
           if (response.ok) {
               console.log(response);    
             return response.json();    
             
           }})
        .then((body) => {
               console.log('data updated successfully:', body);
               changeArrayState(body);
              //  setSelectedStHours(data);
               setUpdateSH(false);
               setIsModalOpen(false);

       })
       .catch(error => {
           console.error('Error updating data:', error);
       });

    }

    function handleDelete(stHours){

      const studyHoursId = selectedStHours.id;

      console.log(studyHoursId);
      console.log(stHours);

       
         fetch(`http://localhost:8080/mark-it/student/${studentId}/course/${courseId}/studyHours/deleteStudyHours` , {
           method: 'DELETE',
           headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' },
           body: JSON.stringify({id:studyHoursId}),
         })
           .then((response) => {
             if (response.ok) {
               return response.json();
             }else {
               throw new Error('Unexpected error occurred');
             }
           })
           .then((body) => {
             console.log("Response data:",body);
             alert('Διαγράφηκε!');
            //  setStudyHours(bodata);

            setIsModalOpen(false);

             

            changeArrayState(body);
           
            // setStudyHours(formattedStudyHours);


            //  setSelectedStHours({});
            //  console.log(studyHours);
            //  console.log(selectedStHours);
         
         })
         .catch((error) => {
           console.error(error);
         });

    }

    // useEffect(() => {
    //   console.log("Updated studyHours:", studyHours);
    // }, [studyHours]);


    function getStudentStudyHoursSum(){

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
        updateStudyHoursSum(body);
    });
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

        <div className="courseHoursCalendar">
                <div className="hoursHeaderSmall">
                        <div className="hoursTitleBoxSmall">
                            <div className="boxSVG">
                            <svg width="28" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M11 21q-1.875 0-3.512-.7q-1.638-.7-2.863-1.925T2.7 15.512Q2 13.875 2 12t.7-3.513q.7-1.637 1.925-2.862T7.488 3.7Q9.125 3 11 3q.525 0 1.012.062q.488.063.988.188V5.3q-.5-.15-.988-.225Q11.525 5 11 5Q8.05 5 6.025 7.025Q4 9.05 4 12q0 2.95 2.025 4.975Q8.05 19 11 19q2.95 0 4.975-2.025Q18 14.95 18 12q0-.275-.025-.5q-.025-.225-.075-.5h2.05q.05.275.05.5v.5q0 1.875-.7 3.512q-.7 1.638-1.925 2.863T14.513 20.3Q12.875 21 11 21Zm2.8-4.8L10 12.4V7h2v4.6l3.2 3.2ZM18 9V6h-3V4h3V1h2v3h3v2h-3v3Z"/></svg>
                            </div>
                            <span>Ώρες μελέτης</span>
                        </div>    
                </div>

                 <div className="calendarStudyHours">
                    <FullCalendar
                        //  className="bg-zinc-800 "
                        initialView="dayGridMonth"
                        themeSystem="Simplex"
                        headerToolbar={{
                            left: "prev,next",
                            center: "title",
                            right: "today",
                        }}
                        // weekends={false}
                        plugins={[dayGridPlugin,timeGridPlugin, interactionPlugin]}
                        events={studyHours}
                        displayEventStart="true"
                        eventColor="#004d60"
                        selectable={true}
                        select={handleSelect}


                        // eventContent={renderEventContent}
                        // eventColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
                        // eventColor={"#64c9de"}
                        // editable={true}
                        
                   
                    />

                    {isModalOpen && (
                      <div className="modal">

                        { modalState==="add" &&
                          <div className="addStHours">
                            <label>Προσθέστε ώρες μελέτης για την ημερομηνία: {selectedDate}</label>
                              <form onSubmit={addStudyHours} className="addSHform">
                               <div className="addSHbox"> 
                                <span className="stHrs"> Εισάγετε ώρες μελέτης:
                                  <input type="text" onChange={(e)=>setHours(e.target.value)} required/>
                                </span>
                                {/* <select  onChange={(e) => setSelectedSyllabus(e.target.value)} className="dropdown" id="addSyllabus"  required>
                                  <option value="">Επιλέξτε την ύλη που μελετήσατε:</option>
                                  {syllabusList.map((syllabus,index) => (
                                    <option key={index} value={syllabus.id}>{syllabus.name}</option>
                                  ))}
                                </select> */}
                                </div>
                                <button type="submit" id="addSTBtn">Αποθήκευση</button>
                                <button type="reset">Εκκαθάριση</button>
                              </form>
                          </div>}

                          { modalState ==="edit" && updateSH ===false &&
                             <div className="editStHours">
                                <span>Επεξεργασία πληροφοριών για την ημερομηνία: {selectedDate}</span>
                                <div className="btnArea">
                                  <span>
                                  <label className="hours">Ώρες:</label>
                                  <label> {selectedStHours.hours}</label>
                                  </span>
                                 
                                 <button id="calBtn" onClick={() => handleEditClick(selectedStHours)} >
                                   <svg width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="m226.8 73.9l-44.7-44.7a19.8 19.8 0 0 0-28.2 0l-120 120a19.7 19.7 0 0 0-5.9 14.1V208a20.1 20.1 0 0 0 20 20h44.7a19.7 19.7 0 0 0 14.1-5.9l120-120a19.9 19.9 0 0 0 0-28.2ZM91 204H52v-39l84-84l39 39Zm101-101l-39-39l15-15l39 39Z"/></svg>
                                 </button>
                                 <button id="calBtn2"  onClick={() => handleDelete(selectedStHours)} >
                                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1l1.4 1.4ZM7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM7 6v13V6Z"/></svg>
                                 </button>
                                 </div> 
                             </div>

                          }

                          { updateSH === true &&
                            <div className="editStHours">
                              <span>Επεξεργασία πληροφοριών για την ημερομηνία: {selectedDate}</span>
                              <form className="btnArea" onSubmit={e => handleSaveChange(e)}>
                                <span>
                                  <label className="hours">Ώρες:</label>
                                  <input type="text" defaultValue={selectedStHours.hours} required/>
                                </span>
                                <button id="calBtn"  type="submit">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 19V5a2 2 0 0 1 2-2h11.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 21 7.828V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M8.6 9h6.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6H8.6a.6.6 0 0 0-.6.6v4.8a.6.6 0 0 0 .6.6ZM6 13.6V21h12v-7.4a.6.6 0 0 0-.6-.6H6.6a.6.6 0 0 0-.6.6Z"/></g></svg>
                                </button>
                                <button id="calBtn2" onClick={(e) => handleCancelEdit(e)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M7.7 16.3q.275.275.7.275q.425 0 .7-.275l2.9-2.9l2.925 2.925q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7L13.4 12l2.925-2.925q.275-.275.262-.688q-.012-.412-.287-.687q-.275-.275-.7-.275q-.425 0-.7.275L12 10.6L9.075 7.675Q8.8 7.4 8.388 7.412q-.413.013-.688.288q-.275.275-.275.7q0 .425.275.7l2.9 2.9l-2.925 2.925q-.275.275-.262.687q.012.413.287.688ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"/></svg>
                                </button>
                             </form> 
                           </div>

                          }
                      
                        <button onClick={handleModalClose}>Τέλος</button>
                      </div>
                    )}





                   
                   
               </div>
            



        </div>

    );
}

export default StudentStudyingHoursTable;


// function renderEventContent(eventInfo) {


//  const eventTitle = eventInfo.event.title;
//  const eventId = eventInfo.event.publicId;



//   return (
//     <>
//      {/* <StudentEventCalendar title={eventTitle} id={eventId}  /> */}
     
//       {eventInfo.event.title!=null && 
//         <div className="clendarEvent" >
//           <label>{eventInfo.event.title}</label>
//         </div>
//       }

     
//     </>
//   )
// }

// title: '3',publicId: '4'