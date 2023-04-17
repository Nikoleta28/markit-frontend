import React from "react";
import { useState } from "react";
import { useEffect } from "react";


function SecrProfile(){

    const [secretariatData, setSecretariatData] = useState({});

     // Get the id from local storage
    const secretariatId = localStorage.getItem("userId");



    // const getSecrData =  () => {
    //     fetch(`http://localhost:8080/mark-it/secretariat/${secretariatId}`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         setSecretariatData(data); 
    //     })
    //     .catch((error) => {
    //         console.error("Error fetching secretariat data: ", error);
    //     });
    // }


    useEffect(() => {
        const getSecrData = async () => {
          try {
            const response = await fetch(`http://localhost:8080/mark-it/secretariat/${secretariatId}`);
            const data = await response.json();
             setSecretariatData(data);

          } catch (error) {
            console.error("Error fetching secretariat data: ", error);
          }
        };
    
        getSecrData();
      }, [secretariatId]);


  


    const handleSaveChange = (e) => {
        e.preventDefault();

        // console.log(secretariatId);
    
        const editedUniversity = e.target[0].value;
        const editedDepartment = e.target[1].value;
        const editedEmail = e.target[2].value;
        const editedPassword = e.target[3].value;
    
        // send the updated data to the server 
        fetch('http://localhost:8080/mark-it/secretariat/' + secretariatId + '/updateSecretariat', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        university:editedUniversity,
        department: editedDepartment,
        email:editedEmail,
        password:editedPassword})
        })
        // .then(response => response.json())
        .then((response) => {
            if (response.ok) {
                console.log(response);    
              return response.json();    
              
            }})
        .then(data => {
            
                console.log('Secretariat data updated successfully:', data);

                // update the state with the new data
                setSecretariatData(data);

                //close input form and display secretariat information
                setEditInfo(false);
                setShowSecretariatInfo(true);
        })
        .catch(error => {
            console.error('Error updating secretariat data:', error);
        });

         setEditInfo(false);
         setShowSecretariatInfo(true);
    }


    const [showSecretariatInfo,setShowSecretariatInfo] = useState(true);

    const [editInfo,setEditInfo] = useState(false);

    const showEdit = (e) => {
        setEditInfo(e);
        setShowSecretariatInfo(false);
    }
    
    const cancelEdit = (e) => {
        setShowSecretariatInfo(true);
        setEditInfo(false);
    }


    return(
        <div className="profileInfo">

        <div className="infoForm">
                <div className="edit">
                    { editInfo ===false &&
                        <button onClick={() => showEdit(true)} id="editInfoBtn">  
                        <svg width="25" height="25" viewBox="0 0 256 256"><path fill="currentColor" d="m226.8 73.9l-44.7-44.7a19.8 19.8 0 0 0-28.2 0l-120 120a19.7 19.7 0 0 0-5.9 14.1V208a20.1 20.1 0 0 0 20 20h44.7a19.7 19.7 0 0 0 14.1-5.9l120-120a19.9 19.9 0 0 0 0-28.2ZM91 204H52v-39l84-84l39 39Zm101-101l-39-39l15-15l39 39Z"/></svg>
                    </button>}
                </div>
                <svg className="profilePic" width="180" height="180" viewBox="0 0 24 24"><g fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.2"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z"/><path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"/></g></svg>
                { showSecretariatInfo &&
                    <div className="displayInfoForm"> 
                        <label>{secretariatData.university}</label>
                        <label>{secretariatData.department}</label>
                        <label>{secretariatData.email}</label>
                        <label>{secretariatData.password}</label>
                    </div>
                    
                    }
         
            {  editInfo &&
               <form className="editInfoForm"  onSubmit={e => handleSaveChange(e)}>
                 <input type="text" name="university" placeholder="Πανεπιστήμιο" defaultValue={secretariatData.university} />
                 <input type="text" name="department" placeholder="Τμήμα"  defaultValue={secretariatData.department}/>
                 <input type="email" name="email" placeholder="E-mail"  defaultValue={secretariatData.email} />
                 <input type="password" name="password" className="crtPswd" placeholder="Κωδικός"  defaultValue={secretariatData.password} />  
                 <span>
                    <button id="saveCourseEdit" type="submit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 19V5a2 2 0 0 1 2-2h11.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 21 7.828V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M8.6 9h6.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6H8.6a.6.6 0 0 0-.6.6v4.8a.6.6 0 0 0 .6.6ZM6 13.6V21h12v-7.4a.6.6 0 0 0-.6-.6H6.6a.6.6 0 0 0-.6.6Z"/></g></svg>
                    </button>
                    <button onClick={(e) => cancelEdit(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M7.7 16.3q.275.275.7.275q.425 0 .7-.275l2.9-2.9l2.925 2.925q.275.275.688.262q.412-.012.687-.287q.275-.275.275-.7q0-.425-.275-.7L13.4 12l2.925-2.925q.275-.275.262-.688q-.012-.412-.287-.687q-.275-.275-.7-.275q-.425 0-.7.275L12 10.6L9.075 7.675Q8.8 7.4 8.388 7.412q-.413.013-.688.288q-.275.275-.275.7q0 .425.275.7l2.9 2.9l-2.925 2.925q-.275.275-.262.687q.012.413.287.688ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"/></svg>
                    </button>
                 </span>
              </form>}

         </div>  
    </div>
    );
}

export default SecrProfile;