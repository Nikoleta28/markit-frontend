
import React, { useState } from "react";
import { useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";


function StudentCalendar(){

    const studentId = localStorage.getItem("userId");
    const [assignments,setAssignments] = useState([]);
    const [tooltipContent, setTooltipContent] = useState("");
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        const getStudentAssignmentList = async () => {
          try {
            const response = await fetch(`http://localhost:8080/mark-it/student/${studentId}/courses/assignmentLists`, {
                method: 'GET', // Use the appropriate HTTP method
                headers: {
                  'Content-Type': 'application/json', 
                  'Access-Control-Allow-Origin' : '*'
                }
              });
              if (response.ok) { // Check if the response is successful
                const data = await response.json();


                const formattedAssignments = data.map((assignment) => ({
                  ...assignment,
                  start: assignment.end,
                }));
      
                setAssignments(formattedAssignments);
                console.log(assignments);

                // setAssignments(data);
                // console.log(assignments);
         
              } else {
                console.error("we get response but its an error: ", response.status);
              }
        
            } catch (error) {
              console.error("Error fetching professor assignment list: ", error);
            }
          };
     
        getStudentAssignmentList();
      }, [studentId]);



      const handleEventMouseEnter = (arg) => {
        const assignmentTitle = arg.event.title;
    
        // Set tooltip content and position
        setTooltipContent(assignmentTitle);
        setTooltipPosition({
          top: arg.jsEvent.clientY,
          left: arg.jsEvent.clientX,
        });
      };
    
      const handleEventMouseLeave = () => {
        // Clear tooltip content and position
        setTooltipContent("");
        setTooltipPosition({ top: 10, left: 20 });
      };

    return (
      <>
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
          plugins={[dayGridPlugin,timeGridPlugin]}
          events={assignments}
          displayEventEnd="true"
          // eventColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
          eventColor={"#64c9de"}
          eventMouseEnter={handleEventMouseEnter}
          eventMouseLeave={handleEventMouseLeave}
      />
      {tooltipContent && (
        <div
          className="event-tooltip"
          style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
        >
          {tooltipContent}
        </div>
      )}
    </>
    );


}


export default StudentCalendar;