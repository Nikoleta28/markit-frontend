import React, { useState } from "react";
import { useEffect } from "react";

function ProfCourseCard(){


    const courseId = localStorage.getItem("profCourseId");
    const professorId = localStorage.getItem("userId");

    const [course,setCourse] = useState([]);

    

    useEffect(() => {
        const getProfCourse = async () => {
          try {
            const response = await fetch(`http://localhost:8080/mark-it/professor/${professorId}/course?courseId=${courseId}`, {
                method: 'GET', // Use the appropriate HTTP method
                headers: {
                  'Content-Type': 'application/json', 
                  'Access-Control-Allow-Origin' : '*'
                }
              });
              if (response.ok) { // Check if the response is successful
                const data = await response.json();
                setCourse(data);
                // console.log(data);
                console.log(course);
                
              } else {
                console.error("Error fetching professor course list: ", response.status);
              }
        
            } catch (error) {
              console.error("Error fetching professor course list: ", error);
            }
          };
     
        getProfCourse();
      }, [professorId]);

 //----------------------------------------------------------------------------------------------------------------------     

    const [editAssign,setEditAssign] = useState(false);

    const [asList,setAssignmentList] = useState([]);
  
    useEffect(() => {
        const getProfAssignmentList = async () => {
          try {
            const response = await fetch(`http://localhost:8080/mark-it/professor/${professorId}/course/${courseId}/assignmentList`, {
                method: 'GET', // Use the appropriate HTTP method
                headers: {
                  'Content-Type': 'application/json', 
                  'Access-Control-Allow-Origin' : '*'
                }
              });
              if (response.ok) { // Check if the response is successful
                const data = await response.json();
                setAssignmentList(data);
                console.log(asList);
                // console.log(course);
              } else {
                console.error("we get response but its an error: ", response.status);
              }
        
            } catch (error) {
              console.error("Error fetching professor assignment list: ", error);
            }
          };
     
        getProfAssignmentList();
      }, [professorId]);



    const [currentAssignment,setCurrentAssignment] = useState({});
    const [editingAssignmentId,setEditingAssignmentId] = useState(null);
    const [initialName,setInitialName] = useState('');
    const [initialPercentage,setInitialPercentage] = useState(null);
    const [initialDate,setInitialDate] = useState('');

    function handleEditClick(assignment){
      setEditingAssignmentId(assignment.id);
      setEditAssign(true);
      setCurrentAssignment(assignment);
      console.log(assignment);

      setInitialName(assignment.name);
      setInitialPercentage(assignment.percentage);
      setInitialDate(assignment.date);
    }

    function handleCancelEdit() {
        setEditAssign(false);
    }

    const saveEditProfAssignment = (e) => {
      console.log(editingAssignmentId);
      console.log(initialName);
      console.log(initialPercentage);
      console.log(initialDate);
      
       alert('Θέλετε σίγουρα να επεξεργαστείτε αυτή την εργασία;');
           // send the updated data to the server 
           fetch('http://localhost:8080/mark-it/professor/' + professorId + '/course/'+ courseId + '/assignment/updateAssignment',{
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
                 'Access-Control-Allow-Origin' : '*'
             },
             body: JSON.stringify({
               id: editingAssignmentId,
               name: initialName, 
               percentage : initialPercentage ,
               date: initialDate})
             })
             .then((response) => {
                 if (response.ok) {
                     console.log(response);    
                   return response.json();    
      
                 }})
             .then((body) => {
                   console.log('Secretariat data updated successfully:', body);
                    //close input form and display secretariat information
                    setAssignmentList(body);
                    setEditAssign(false);
             })
             .catch(error => {
                 console.error('Error updating secretariat data:', error);
             });
        
    }


      const [addAssignment, setAddAssign] = useState(false);
      const [assignName,setAssignName] = useState();
      const [percentage,setPercentage] = useState();
      const [date,setDate] = useState();


      const addProfAssignment =  (event) => {
        event.preventDefault();     

        if(assignName!== undefined && percentage!== undefined && date!== undefined){
          alert('Θέλετε να δημιουργήσετε σίγουρα αυτή την εργασία;');
          
          fetch('http://localhost:8080/mark-it/professor/' + professorId + '/course/'+ courseId + '/assignments/addAssignment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' },
            body: JSON.stringify({
            name: assignName, 
            percentage : percentage ,
            date: date}),
          })
            .then((response) => { 
              if (response.ok) {
                return response.json();
              }
              else {
                throw new Error('Unexpected error occurred');
              }
            })
            .then((body) => {
              console.log("Response body:", body);
              setAddAssign(false);
              setAssignmentList(body);
          })
          .catch((error) => {
            console.error(error);
          });
          
        }else{
          alert('Πρέπει να συμπληρώσετε όλα τα πεδία!');
        }

      }



      const deleteAssignment = (id) => {
        console.log(id);
         alert('Θέλετε να διαγράψετε σίγουρα αυτή την εργασία;');
       
         fetch('http://localhost:8080/mark-it/professor/' + professorId + '/course/' +courseId+ '/assignments/deleteAssignment' , {
           method: 'DELETE',
           headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' },
           body: JSON.stringify({id:id}),
         })
           .then((response) => {
             if (response.ok) {
               
               return response.json();
               // setSecrCourseList(secrCourseList.filter((course) => course.name !== name));
               // return response.json();
             }else {
               throw new Error('Unexpected error occurred');
             }
           })
           .then((body) => {
             
             console.log("Response body:", body);
             setAssignmentList(body);
             alert('Η εργασία διαγράφηκε!');
         })
         .catch((error) => {
           console.error(error);
         });
       
     }





 //------------------------------------------------------------------------------------------------------------------------   

   
  const [editSyllabus,setEditSyllabus] = useState(false);

  const [syllabusList,setSyllabusList] = useState([]);

  useEffect(() => {
      const getProfSyllabusList = async () => {
        try {
          const response = await fetch(`http://localhost:8080/mark-it/professor/${professorId}/course/${courseId}/syllabusList`, {
              method: 'GET', // Use the appropriate HTTP method
              headers: {
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin' : '*'
              }
            });
            if (response.ok) { // Check if the response is successful
              const data = await response.json();
              setSyllabusList(data);
              console.log(syllabusList);
              // console.log(course);
            } else {
              console.error("we get response but its an error: ", response.status);
            }
   
          } catch (error) {
            console.error("Error fetching professor assignment list: ", error);
          }
        };

        getProfSyllabusList();
    }, [professorId]);

  

 const [currentSyllabus,setCurrentSyllabus] = useState({});
 const [editingSyllabusId,setEditingSyllabusId] = useState(null);
 const [initialSylName,setInitialSylName] = useState('');
 const [initialDifficulty,setInitialDifficulty] = useState(null);


 function handleEditClick(syllabus){
   setEditingSyllabusId(syllabus.id);
   setEditSyllabus(true);
   setCurrentSyllabus(syllabus);
   console.log(syllabus);

   setInitialSylName(syllabus.name);
   setInitialDifficulty(syllabus.difficulty);

 }

 function handleCancelEdit() {
     setEditSyllabus(false);
 }

 const saveEditProfSyllabus = (e) => {
   console.log(editingSyllabusId);
   console.log(initialSylName);
   console.log(initialDifficulty);

   
    alert('Θέλετε σίγουρα να επεξεργαστείτε αυτή την ύλη;');
        // send the updated data to the server 
        fetch('http://localhost:8080/mark-it/professor/' + professorId + '/course/'+ courseId + '/syllabus/updateSyllabus',{
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin' : '*'
          },
          body: JSON.stringify({
            id: editingSyllabusId,
            name: initialSylName, 
            difficulty : initialDifficulty ,
            })
          })
          .then((response) => {
              if (response.ok) {
                  console.log(response);    
                return response.json();    
   
              }})
          .then((body) => {
                console.log('Secretariat data updated successfully:', body);
                 //close input form and display secretariat information
                 setSyllabusList(body);
                 setEditSyllabus(false);
          })
          .catch(error => {
              console.error('Error updating syllabus data:', error);
          });
     
 }


   const [addSyllabus, setAddSyllabus] = useState(false);
   const [syllabusName,setSyllabusName] = useState();
   const [difficulty,setDifficulty] = useState();



   const addProfSyllabus =  (event) => {
     event.preventDefault();     

     if(syllabusName!== undefined && difficulty!== undefined ){
       alert('Θέλετε να δημιουργήσετε σίγουρα αυτή την ύλη;');
       
       fetch('http://localhost:8080/mark-it/professor/' + professorId + '/course/'+courseId+ '/syllabuses/addSyllabus', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' },
         body: JSON.stringify({
         name: syllabusName, 
         difficulty : difficulty ,
        }),
       })
         .then((response) => { 
           if (response.ok) {
             return response.json();
           }
           else {
             throw new Error('Unexpected error occurred');
           }
         })
         .then((body) => {
           console.log("Response body:", body);
           setAddSyllabus(false);
           setSyllabusList(body);
       })
       .catch((error) => {
         console.error(error);
       });
       
     }else{
       alert('Πρέπει να συμπληρώσετε όλα τα πεδία!');
     }

   }



   const deleteSyllabus = (id) => {
     console.log(id);
      alert('Θέλετε να διαγράψετε σίγουρα αυτή την ύλη;');
    
      fetch('http://localhost:8080/mark-it/professor/' + professorId + '/course/' +courseId+ '/syllabuses/deleteSyllabus' , {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' },
        body: JSON.stringify({id:id}),
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
          setSyllabusList(body);
          alert('Η ύλη διαγράφηκε!');
      })
      .catch((error) => {
        console.error(error);
      });
    
  }



  //---------------------------------------------------------------------------------------------------------------------

  return(
      

    <div className="profCourseCard">
            <div  className="profCourseName">
                <span>Μάθημα:</span>
                <label id="courseProf">{course.name}</label>
            </div>
            <table className="profCourseTable">
                <thead className="courseTableHeader">
                <tr className="tableHeader">
                    <th>Εργασίες</th> 
                    <th>Ποσοστό</th>
                    <th>Προθεσμία</th>
                    <th>
                        <button id="buttonFlex" onClick={() => setAddAssign(true)}>
                            <svg width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z"/></svg>
                            <p>Προσθήκη εργασίας</p>
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
               

                  {asList.map((assignment,index) => (
                                <React.Fragment key={assignment.id}>
                                   { editAssign === false && 
                                      <tr key={assignment.id}>
                                          <td>{assignment.name}</td>
                                          <td>{assignment.percentage}</td>
                                          <td>{assignment.date}</td>
                                          <td>
                                          <button className="editSecrCourse" onClick={() => handleEditClick(assignment)}>
                                            <svg width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="m226.8 73.9l-44.7-44.7a19.8 19.8 0 0 0-28.2 0l-120 120a19.7 19.7 0 0 0-5.9 14.1V208a20.1 20.1 0 0 0 20 20h44.7a19.7 19.7 0 0 0 14.1-5.9l120-120a19.9 19.9 0 0 0 0-28.2ZM91 204H52v-39l84-84l39 39Zm101-101l-39-39l15-15l39 39Z"/></svg>
                                          </button>
                                          <button id="deleteSecrCourse" onClick={() => deleteAssignment(assignment.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1l1.4 1.4ZM7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM7 6v13V6Z"/></svg>
                                          </button>
                                          </td>
                                      </tr>}
                                   { editingAssignmentId===assignment.id && editAssign &&
                                      (
                                        <tr className="newCourse" key={assignment.id} >
                                          <td><input type="text" 
                                                    name="name"
                                                    value={initialName}
                                                    placeholder="Εργασία" 
                                                    onChange={(e)=>setInitialSylName(e.target.value)}
                                                    /> </td>
                                          <td><input type="text" 
                                                    name="year" 
                                                    value={initialPercentage} 
                                                    placeholder="Ποσοστό"  
                                                    onChange={(e)=>setInitialPercentage(e.target.value)}
                                                      /></td>
                                          <td><input type="text" 
                                                    name="semester" 
                                                    value={initialDate} 
                                                    placeholder="Προθεσμία" 
                                                    onChange={(e)=>setInitialDate(e.target.value)}
                                                      /></td>
                                          
                                          <td>
                                          <button id="saveCourseEdit" onClick={(e) =>saveEditProfAssignment(e)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 19V5a2 2 0 0 1 2-2h11.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 21 7.828V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M8.6 9h6.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6H8.6a.6.6 0 0 0-.6.6v4.8a.6.6 0 0 0 .6.6ZM6 13.6V21h12v-7.4a.6.6 0 0 0-.6-.6H6.6a.6.6 0 0 0-.6.6Z"/></g></svg>
                                          </button>
                                          <button onClick={() =>  handleCancelEdit()}>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7.7 16.3q.275.275.7.275q.425 0 .7-.275l2.9-2.9l2.925 2.925q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7L13.4 12l2.925-2.925q.275-.275.262-.688q-.012-.412-.287-.687q-.275-.275-.7-.275q-.425 0-.7.275L12 10.6L9.075 7.675Q8.8 7.4 8.388 7.412q-.413.013-.688.288q-.275.275-.275.7q0 .425.275.7l2.9 2.9l-2.925 2.925q-.275.275-.262.687q.012.413.287.688ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"/></svg>
                                          </button>
                                          </td>
                                        </tr>)}  
                                  </React.Fragment>
                    ))}

                  {  addAssignment  &&
                        <tr className="newCourse">
                              <td><input type="text" name="name" placeholder="Τίτλος" onChange={(e)=>setAssignName(e.target.value)}/></td>
                              <td><input type="text" name="percentage" placeholder="Ποσοστό" onChange={(e)=>setPercentage(e.target.value)}/></td>
                              <td><input etype="text"name="date" placeholder="Παράδοση" onChange={(e)=>setDate(e.target.value)}/></td>
                              <td>
                              <button id="saveCourseEdit" onClick={addProfAssignment}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 19V5a2 2 0 0 1 2-2h11.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 21 7.828V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M8.6 9h6.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6H8.6a.6.6 0 0 0-.6.6v4.8a.6.6 0 0 0 .6.6ZM6 13.6V21h12v-7.4a.6.6 0 0 0-.6-.6H6.6a.6.6 0 0 0-.6.6Z"/></g></svg>
                              </button>
                              <button onClick={() => setAddAssign(false)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7.7 16.3q.275.275.7.275q.425 0 .7-.275l2.9-2.9l2.925 2.925q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7L13.4 12l2.925-2.925q.275-.275.262-.688q-.012-.412-.287-.687q-.275-.275-.7-.275q-.425 0-.7.275L12 10.6L9.075 7.675Q8.8 7.4 8.388 7.412q-.413.013-.688.288q-.275.275-.275.7q0 .425.275.7l2.9 2.9l-2.925 2.925q-.275.275-.262.687q.012.413.287.688ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"/></svg>
                              </button>
                              </td>
                      </tr>
                    } 
                </tbody>
            </table>




            <table className="profCourseTable">
                <thead className="courseTableHeader">
                <tr className="tableHeader">
                    <th>Εβδομαδιαία ύλη</th>
                    <th>Δυσκολία</th>
                    <th>
                        <button id="buttonFlex" onClick={() => setAddSyllabus(true)}>
                            <svg width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z"/></svg>
                            <p>Προσθήκη ύλης</p>
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                  {syllabusList.map((syllabus,index) => (
                                  <React.Fragment key={syllabus.id}>
                                    { editSyllabus === false && 
                                        <tr key={syllabus.id}>
                                            <td>{syllabus.name}</td>
                                            <td>{syllabus.difficulty}</td>
                                            <td>
                                            <button className="editSecrCourse" onClick={() => handleEditClick(syllabus)}>
                                              <svg width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="m226.8 73.9l-44.7-44.7a19.8 19.8 0 0 0-28.2 0l-120 120a19.7 19.7 0 0 0-5.9 14.1V208a20.1 20.1 0 0 0 20 20h44.7a19.7 19.7 0 0 0 14.1-5.9l120-120a19.9 19.9 0 0 0 0-28.2ZM91 204H52v-39l84-84l39 39Zm101-101l-39-39l15-15l39 39Z"/></svg>
                                            </button>
                                            <button id="deleteSecrCourse" onClick={() => deleteSyllabus(syllabus.id)}>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1l1.4 1.4ZM7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM7 6v13V6Z"/></svg>
                                            </button>
                                            </td>
                                        </tr>}
                                    { editingSyllabusId===syllabus.id && editSyllabus &&
                                        (
                                          <tr className="newCourse" key={syllabus.id} >
                                            <td><input type="text" 
                                                      name="name"
                                                      value={initialSylName}
                                                      placeholder="Ύλη" 
                                                      onChange={(e)=>setInitialSylName(e.target.value)}
                                                      /> </td>
                                            <td><input type="text" 
                                                      name="year" 
                                                      value={initialDifficulty} 
                                                      placeholder="Δυσκολία"  
                                                      onChange={(e)=>setInitialDifficulty(e.target.value)}
                                                        /></td>
                                            <td>            
                                              <button id="saveCourseEdit" onClick={(e) =>saveEditProfSyllabus(e)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 19V5a2 2 0 0 1 2-2h11.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 21 7.828V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M8.6 9h6.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6H8.6a.6.6 0 0 0-.6.6v4.8a.6.6 0 0 0 .6.6ZM6 13.6V21h12v-7.4a.6.6 0 0 0-.6-.6H6.6a.6.6 0 0 0-.6.6Z"/></g></svg>
                                              </button>
                                              <button onClick={() =>  handleCancelEdit()}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7.7 16.3q.275.275.7.275q.425 0 .7-.275l2.9-2.9l2.925 2.925q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7L13.4 12l2.925-2.925q.275-.275.262-.688q-.012-.412-.287-.687q-.275-.275-.7-.275q-.425 0-.7.275L12 10.6L9.075 7.675Q8.8 7.4 8.388 7.412q-.413.013-.688.288q-.275.275-.275.7q0 .425.275.7l2.9 2.9l-2.925 2.925q-.275.275-.262.687q.012.413.287.688ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"/></svg>
                                              </button>
                                            </td>
                                          </tr>)}  
                                    </React.Fragment>
                      ))}

                    {  addSyllabus &&
                          <tr className="newCourse">
                                <td><input type="text" name="name" placeholder="Τίτλος" onChange={(e)=>setSyllabusName(e.target.value)}/></td>
                                <td><input type="text" name="percentage" placeholder="Ποσοστό" onChange={(e)=>setDifficulty(e.target.value)}/></td>
                                <td>
                                  <button id="saveCourseEdit" onClick={addProfSyllabus}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 19V5a2 2 0 0 1 2-2h11.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 21 7.828V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M8.6 9h6.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6H8.6a.6.6 0 0 0-.6.6v4.8a.6.6 0 0 0 .6.6ZM6 13.6V21h12v-7.4a.6.6 0 0 0-.6-.6H6.6a.6.6 0 0 0-.6.6Z"/></g></svg>
                                  </button>
                                  <button onClick={() => setAddSyllabus(false)}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7.7 16.3q.275.275.7.275q.425 0 .7-.275l2.9-2.9l2.925 2.925q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7L13.4 12l2.925-2.925q.275-.275.262-.688q-.012-.412-.287-.687q-.275-.275-.7-.275q-.425 0-.7.275L12 10.6L9.075 7.675Q8.8 7.4 8.388 7.412q-.413.013-.688.288q-.275.275-.275.7q0 .425.275.7l2.9 2.9l-2.925 2.925q-.275.275-.262.687q.012.413.287.688ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"/></svg>
                                  </button>
                                </td>
                        </tr>
                      } 
                
                </tbody>
            </table>


    </div>

  );

}

export default ProfCourseCard;




{/* <tr>
                        {  editSyllabus === "noEdit" ?
                            <>
                                <td>1.Εισαγωγή</td>
                                <td>2</td>
                                <td>
                                    <button id="editProfCourse" onClick={() => showEditSyllabus("edit")}>
                                    <svg width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="m226.8 73.9l-44.7-44.7a19.8 19.8 0 0 0-28.2 0l-120 120a19.7 19.7 0 0 0-5.9 14.1V208a20.1 20.1 0 0 0 20 20h44.7a19.7 19.7 0 0 0 14.1-5.9l120-120a19.9 19.9 0 0 0 0-28.2ZM91 204H52v-39l84-84l39 39Zm101-101l-39-39l15-15l39 39Z"/></svg>
                                    </button>
                                </td> 
                            </>
                        : 
                            <>
                                <td><input /></td>
                                <td><input /></td>
                                <td >
                                    <button id="saveCourseEdit">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 19V5a2 2 0 0 1 2-2h11.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 21 7.828V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M8.6 9h6.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6H8.6a.6.6 0 0 0-.6.6v4.8a.6.6 0 0 0 .6.6ZM6 13.6V21h12v-7.4a.6.6 0 0 0-.6-.6H6.6a.6.6 0 0 0-.6.6Z"/></g></svg>
                                    </button>
                                    <button onClick={() => showEditSyllabus("noEdit")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7.7 16.3q.275.275.7.275q.425 0 .7-.275l2.9-2.9l2.925 2.925q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7L13.4 12l2.925-2.925q.275-.275.262-.688q-.012-.412-.287-.687q-.275-.275-.7-.275q-.425 0-.7.275L12 10.6L9.075 7.675Q8.8 7.4 8.388 7.412q-.413.013-.688.288q-.275.275-.275.7q0 .425.275.7l2.9 2.9l-2.925 2.925q-.275.275-.262.687q.012.413.287.688ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"/></svg>
                                    </button>
                                </td> 
                                
                            </>

                            
                        } 
                    </tr>

                    {  addSyllabus ==="show" &&
                            <tr className="newCourse">
                                <td><input /></td>
                                <td><input /></td>
                                <td>
                                <button id="saveCourseEdit">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 19V5a2 2 0 0 1 2-2h11.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 21 7.828V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M8.6 9h6.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6H8.6a.6.6 0 0 0-.6.6v4.8a.6.6 0 0 0 .6.6ZM6 13.6V21h12v-7.4a.6.6 0 0 0-.6-.6H6.6a.6.6 0 0 0-.6.6Z"/></g></svg>
                                </button>
                                <button onClick={() => addNewSyllabus("hide")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7.7 16.3q.275.275.7.275q.425 0 .7-.275l2.9-2.9l2.925 2.925q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7L13.4 12l2.925-2.925q.275-.275.262-.688q-.012-.412-.287-.687q-.275-.275-.7-.275q-.425 0-.7.275L12 10.6L9.075 7.675Q8.8 7.4 8.388 7.412q-.413.013-.688.288q-.275.275-.275.7q0 .425.275.7l2.9 2.9l-2.925 2.925q-.275.275-.262.687q.012.413.287.688ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"/></svg>
                                </button>
                                </td>
                            </tr>
                        } */}
