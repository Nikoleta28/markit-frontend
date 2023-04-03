import React from "react";
import { useState } from "react";

function StudentProfile(){

    const [showStudentInfo,setShowStudentInfo] = useState(true);

    const [editInfo,setEditInfo] = useState(false);

    const showEdit = (e) => {
        setEditInfo(e);
        setShowStudentInfo(false);
    }

    const cancelEdit = (e) => {
        setShowStudentInfo(e);
        setEditInfo(false);
    }


    return(
        <div class="profileInfo">

        <div class="infoForm">
                <div class="edit">

                { editInfo ===false &&
                    <button onClick={() => showEdit(true)} id="editInfoBtn">  
                    <svg width="25" height="25" viewBox="0 0 256 256"><path fill="currentColor" d="m226.8 73.9l-44.7-44.7a19.8 19.8 0 0 0-28.2 0l-120 120a19.7 19.7 0 0 0-5.9 14.1V208a20.1 20.1 0 0 0 20 20h44.7a19.7 19.7 0 0 0 14.1-5.9l120-120a19.9 19.9 0 0 0 0-28.2ZM91 204H52v-39l84-84l39 39Zm101-101l-39-39l15-15l39 39Z"/></svg>
                   </button>}

                </div>
                <svg class="profilePic" width="180" height="180" viewBox="0 0 24 24"><g fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.2"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z"/><path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"/></g></svg>
                { showStudentInfo &&
                    <div class="displayInfoForm">
                        <label>Νικολέτα Γκούλη</label>
                        <label>ΠΑΜΑΚ</label>
                        <label>Εφαρμοσμένη Πληροφορική</label>
                        <label>dai19252</label>
                        <label>dai19252@uom.edu.gr</label>
                        <label>********</label>
                    </div>
                    
                    }
         
            {  editInfo &&
               <form class="editInfoForm">
                 <input type="text" placeholder="Ονοματεπώνυμο" />
                 <input type="text" placeholder="Πανεπιστήμιο" />
                 <input type="text" placeholder="Τμήμα" />
                 <input type="email" placeholder="E-mail" />
                 <input type="text" placeholder="Μητρώο"/>
                 <input type="password" class="crtPswd" placeholder="Κωδικός" />  
                 <span>
                    <button id="saveCourseEdit" type="submit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 19V5a2 2 0 0 1 2-2h11.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 21 7.828V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M8.6 9h6.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6H8.6a.6.6 0 0 0-.6.6v4.8a.6.6 0 0 0 .6.6ZM6 13.6V21h12v-7.4a.6.6 0 0 0-.6-.6H6.6a.6.6 0 0 0-.6.6Z"/></g></svg>
                    </button>
                    <button onClick={() => cancelEdit(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M7.7 16.3q.275.275.7.275q.425 0 .7-.275l2.9-2.9l2.925 2.925q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7L13.4 12l2.925-2.925q.275-.275.262-.688q-.012-.412-.287-.687q-.275-.275-.7-.275q-.425 0-.7.275L12 10.6L9.075 7.675Q8.8 7.4 8.388 7.412q-.413.013-.688.288q-.275.275-.275.7q0 .425.275.7l2.9 2.9l-2.925 2.925q-.275.275-.262.687q.012.413.287.688ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"/></svg>
                    </button>
                 </span>
              </form>}

         </div>  
    </div>
    );
}

export default StudentProfile;