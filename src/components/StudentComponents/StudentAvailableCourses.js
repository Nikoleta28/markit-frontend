import React from "react";
import { useState ,useEffect } from "react";


const StudentAvailableCourses = (props) =>{

  const { updateCourseList } = props;

    const studentId = localStorage.getItem("userId");

    const [courseList,setCourseList] = useState([]);

    // const [newCourses,setNewCourses] = useState([]);


    useEffect(() => {
        const getStudentAvCourseList = async () => {
          try {
            const response = await fetch(`http://localhost:8080/mark-it/student/${studentId}/availableCoursesList`);
            const data = await response.json();
            setCourseList(data);
          } catch (error) {
            console.error("Error fetching professor course list: ", error);
          }
        };
        getStudentAvCourseList();
      }, [studentId]);
     


      const addCourseToStudent= (id) => {

        console.log(id);

        fetch(`http://localhost:8080/mark-it/student/${studentId}/addCourseToStudent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*' },
            body: JSON.stringify({id:id}),
          })
            .then((response) => {
              if (response.ok) {
                alert('Το μάθημα προστέθηκε!');
                return response.json();
               
              }
            })
            .then((body) => {
              console.log("Response body:", body);
              updateCourseList(body);
          })
          .catch((error) => {
            console.error(error);
          });
          
      
      }


    



    return(
    <>
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
                  {courseList.map((course) => (
                         <tr key={course.id}>
                             <td>{course.name}</td>
                             <td>{course.year}</td>
                             <td>{course.semester}</td>
                             <td>{course.professor}</td>
                             <td>
                               <button onClick={() => addCourseToStudent(course.id)}>
                                  <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z"/></svg> 
                               </button>
                             </td>
                         </tr>
                   )) }
                              
                </tbody>
            </table>


        </div>

    </>


);




}

export default StudentAvailableCourses;