import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function SecrCourses(){
    
    // const [secrCourseList, setSecrCourseList] = useState({});

    const secretariatId = localStorage.getItem("userId"); // Get the id from local storage

    // const [courseId,setCourseId] = useState(null);


    const [courseList,setCourseList] = useState([]);
  
    useEffect(() => {
       const getSecrCourseList = async () => {
         try {
           const response = await fetch(`http://localhost:8080/mark-it/secretariat/${secretariatId}/courseList`);
           const data = await response.json();
           setCourseList(data);

         } catch (error) {
           console.error("Error fetching secretariat course list: ", error);
         }
       };
    
       getSecrCourseList();
     }, [secretariatId]);


     const [profList,setProfList] = useState([]);
  
     useEffect(() => {
        const getSecrProfList = async () => {
          try {
            const response = await fetch(`http://localhost:8080/mark-it/secretariat/${secretariatId}/professorsList`);
            const data = await response.json();
            setProfList(data);
 
          } catch (error) {
            console.error("Error fetching secretariat prof list: ", error);
          }
        };
     
        getSecrProfList();
      }, [secretariatId]);
    

//----------------------------------------------------------------------------------------------------------------

 const [editCourse,setEditCourse] = useState(false);
// const [editingCourseId, setEditingCourseId] = useState(null);
// const [editIndex, setEditIndex] = useState(-1);


const [currentCourse,setCurrentCourse] = useState({});
const [editingCourseId,setEditingCourseId] = useState(null);

// function handleEditClick(index,id) {
//   setEditIndex(index);
//     console.log(editIndex);
//     setEditingCourseId(id);
//     console.log(editingCourseId);
//     setEditCourse(true);
// }


const [initialName,setInitialName] = useState('');
const [initialYear,setInitialYear] = useState(null);
const [initialSemester,setInitialSemester] = useState(null);
const [initialProfessor,setInitialProfessor] = useState('');

function handleEditClick(course){
  setEditingCourseId(course.id);
  setEditCourse(true);
  setCurrentCourse(course);
  console.log(course);

  setInitialName(course.name);
  setInitialYear(course.year);
  setInitialSemester(course.semester);
  setInitialProfessor(course.professor);
}

function handleCancelEdit() {
    // setEditIndex(-1);
    // // setEditingCourse(course);
    setEditCourse(false);
}



const saveEditSecrCourse = (e) => {
  console.log(editingCourseId);
  console.log(initialName);
  console.log(initialYear);
  console.log(initialSemester);
  console.log(initialProfessor);
  

   alert('Θέλετε σίγουρα να επεξεργαστείτε αυτό το μάθημα;');
       // send the updated data to the server 
       fetch('http://localhost:8080/mark-it/secretariat/' + secretariatId + '/courses/updateCourse',{
         method: 'PUT',
         headers: {
             'Content-Type': 'application/json',
             'Access-Control-Allow-Origin' : '*'
         },
         body: JSON.stringify({
           id: editingCourseId,
           name: initialName, 
           year : initialYear ,
           semester: initialSemester,
           professor: initialProfessor})
         })
         // .then(response => response.json())
         .then((response) => {
             if (response.ok) {
                 console.log(response);    
               return response.json();    
  
             }})
         .then((body) => {

               console.log('Secretariat data updated successfully:', body);

                // update the state with the new data
                setCurrentCourse(body);

                //close input form and display secretariat information
                setCourseList(body);
                setEditCourse(false);
         
                //  // setEditingCourse({});
                // //  setEditIndex(-1);
         })
         .catch(error => {
             console.error('Error updating secretariat data:', error);
         });
    
}

//----------------------------------------------------------------------------------------------------------------

      const [addCourse,setAddCourse] = useState(false);
      const [courseName,setCourseName] = useState();
      const [year,setYear] = useState();
      const [semester,setSemester] = useState();
      const [professor,setProfessor] = useState();


      const addSecrCourse =  (event) => {
        event.preventDefault();     

        if(courseName!== undefined && year !== undefined && semester !== undefined){
          alert('Θέλετε να δημιουργήσετε σίγουρα αυτό το μάθημα;');
          
          fetch('http://localhost:8080/mark-it/secretariat/' +secretariatId + '/courses/addCourse?profName='+ professor, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' },
            body: JSON.stringify({
            name: courseName, 
            year : year ,
            semester: semester}),
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              else if(response.status === 404){
                alert("Professor doesnt exist");
              }else {
                throw new Error('Unexpected error occurred');
              }
            })
            .then((body) => {
              console.log("Response body:", body);
              setAddCourse(false);
              setCourseList(body);
          })
          .catch((error) => {
            console.error(error);
          });
          
        }else{
          alert('Πρέπει να συμπληρώσετε όλα τα πεδία!');
        }

      }
 
//---------------------------------------------------------------------------------------------------------------------------------------

// const [courseToDelete,setCourseToDelete] = useState('');

const deleteCourse = (id) => {
   console.log(id);


    alert('Θέλετε να διαγράψετε σίγουρα αυτό το μάθημα;');
  
    fetch('http://localhost:8080/mark-it/secretariat/' +secretariatId + '/courses/deleteCourse' , {
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
        setCourseList(body);
        alert('Το μάθημα διαγράφηκε!');
    })
    .catch((error) => {
      console.error(error);
    });
  
}




return(

    <div className="mainBox">
    <div className="boxHeader">
            <div className="titleBox">
                <div className="boxSVG">
                <svg width="25" height="25" viewBox="0 0 256 256"><path fill="#FFFFFF" d="M76 64a12 12 0 0 1 12-12h128a12 12 0 0 1 0 24H88a12 12 0 0 1-12-12Zm140 52H88a12 12 0 0 0 0 24h128a12 12 0 0 0 0-24Zm0 64H88a12 12 0 0 0 0 24h128a12 12 0 0 0 0-24ZM44 112a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm0-64a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm0 128a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z"/></svg>
                </div>
                <span>Μαθήματα</span>
            </div>

            <button id="buttonFlex" onClick={() => setAddCourse(true)} >
                <svg width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z"/></svg>
                <p>Προσθήκη μαθήματος</p>
            </button>
    </div>

    <div className="courseTableBox">
     <table className="crsSecrTable">
        <thead className="courseTableHeader">
            <tr className="tableHeader">
                <th>Μάθημα</th>
                <th>Έτος</th>
                <th>Εξάμηνο</th>
                <th>Καθηγητής</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
             {courseList.map((course,index) => (
                     <React.Fragment key={course.id}>
                        { editCourse === false &&
                          (<tr key={course.id}>
                              <td>{course.name}</td>
                              <td>{course.year}</td>
                              <td>{course.semester}</td>
                              <td>{course.professor}</td>
                              <td>
                              <button className="editSecrCourse" onClick={() => handleEditClick(course)}>
                                  <svg width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="m226.8 73.9l-44.7-44.7a19.8 19.8 0 0 0-28.2 0l-120 120a19.7 19.7 0 0 0-5.9 14.1V208a20.1 20.1 0 0 0 20 20h44.7a19.7 19.7 0 0 0 14.1-5.9l120-120a19.9 19.9 0 0 0 0-28.2ZM91 204H52v-39l84-84l39 39Zm101-101l-39-39l15-15l39 39Z"/></svg>
                              </button>
                              <button id="deleteSecrCourse" onClick={()=> deleteCourse(course.id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1l1.4 1.4ZM7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM7 6v13V6Z"/></svg>
                              </button>
                              </td>
                          </tr>)}
                          { editingCourseId===course.id && editCourse &&
                           (
                            <tr className="newCourse" key={course.id} >
                              <td><input type="text" 
                                         name="name"
                                         value={initialName}
                                        //  defaultValue={course.name} 
                                         placeholder="Μάθημα" 
                                         onChange={(e)=>setInitialName(e.target.value)}
                                        /> </td>
                              <td><input type="text" 
                                         name="year" 
                                         value={initialYear} 
                                         placeholder="Έτος"  
                                         onChange={(e)=>setInitialYear(e.target.value)}
                                           /></td>
                              <td><input type="text" 
                                         name="semester" 
                                         value={initialSemester} 
                                         placeholder="Εξάμηνο" 
                                         onChange={(e)=>setInitialSemester(e.target.value)}
                                          /></td>
                              <td><select className="dropdown" id="addProfCourse" onChange={(e)=>setInitialProfessor(e.target.value)}>
                                    <option value="">{initialProfessor}</option>
                                       {profList.map((professor,index) => (
                                         <option key={index} value={professor}  >
                                           {professor}
                                         </option>
                                       ))}
                                     </select>
                                   </td>
                              {/* <td><input type="text" 
                                         name="professor" 
                                         value={initialProfessor} 
                                         placeholder="Καθηγητής" 
                                         onChange={(e)=>setInitialProfessor(e.target.value)}
                                          /></td> */}
                              <td>
                              <button id="saveCourseEdit" onClick={(e) =>saveEditSecrCourse(e)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 19V5a2 2 0 0 1 2-2h11.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 21 7.828V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M8.6 9h6.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6H8.6a.6.6 0 0 0-.6.6v4.8a.6.6 0 0 0 .6.6ZM6 13.6V21h12v-7.4a.6.6 0 0 0-.6-.6H6.6a.6.6 0 0 0-.6.6Z"/></g></svg>
                              </button>
                              <button onClick={() =>  handleCancelEdit()}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7.7 16.3q.275.275.7.275q.425 0 .7-.275l2.9-2.9l2.925 2.925q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7L13.4 12l2.925-2.925q.275-.275.262-.688q-.012-.412-.287-.687q-.275-.275-.7-.275q-.425 0-.7.275L12 10.6L9.075 7.675Q8.8 7.4 8.388 7.412q-.413.013-.688.288q-.275.275-.275.7q0 .425.275.7l2.9 2.9l-2.925 2.925q-.275.275-.262.687q.012.413.287.688ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"/></svg>
                              </button>
                              </td>
                            </tr>)} 
                      </React.Fragment>
        ))}

           {  addCourse  &&
                <tr className="newCourse">
                      <td><input type="text" name="name" placeholder="Μάθημα" onChange={(e)=>setCourseName(e.target.value)}/></td>
                      <td><input type="text" name="year" placeholder="Έτος" onChange={(e)=>setYear(e.target.value)}/></td>
                      <td><input etype="text"name="semester" placeholder="Εξάμηνο" onChange={(e)=>setSemester(e.target.value)}/></td>
                      {/* <td><input type="text" name="professor" placeholder="Καθηγητής" onChange={(e)=>setProfessor(e.target.value)}/></td> */}
                      <td><select className="dropdown" id="addProfCourse" onChange={(e)=>setProfessor(e.target.value)}>
                       <option value="">Επιλέξτε καθηγητή</option>
                          {profList.map((professor,index) => (
                            <option key={index}  value={professor} >
                              {professor}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                      <button id="saveCourseEdit" onClick={addSecrCourse}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 19V5a2 2 0 0 1 2-2h11.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 21 7.828V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M8.6 9h6.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6H8.6a.6.6 0 0 0-.6.6v4.8a.6.6 0 0 0 .6.6ZM6 13.6V21h12v-7.4a.6.6 0 0 0-.6-.6H6.6a.6.6 0 0 0-.6.6Z"/></g></svg>
                      </button>
                      <button onClick={() => setAddCourse(false)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7.7 16.3q.275.275.7.275q.425 0 .7-.275l2.9-2.9l2.925 2.925q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7L13.4 12l2.925-2.925q.275-.275.262-.688q-.012-.412-.287-.687q-.275-.275-.7-.275q-.425 0-.7.275L12 10.6L9.075 7.675Q8.8 7.4 8.388 7.412q-.413.013-.688.288q-.275.275-.275.7q0 .425.275.7l2.9 2.9l-2.925 2.925q-.275.275-.262.687q.012.413.287.688ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"/></svg>
                      </button>
                      </td>
               </tr>
            } 
          
        </tbody>
        </table>

    </div>
</div>

);
}

export default SecrCourses;





                       