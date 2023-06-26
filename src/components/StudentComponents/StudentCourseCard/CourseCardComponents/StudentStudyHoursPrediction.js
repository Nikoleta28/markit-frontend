import React from "react";
import { useState , useEffect } from "react";

function StudentStudyHoursPrediction(props){


    const { studyHoursSum } = props;
    const { studyHoursAverage } = props;
    const { studyHoursMAX } = props;
    const { studyHoursMIN } = props;


    return(

        <div className="studentPrediction">
            <div className="predictionHeaderSmall">
                    <div className="predictionTitleBoxSmall">
                        <span>Πρόβλεψη μαθήματος</span>
                    </div>    
                    {  studyHoursSum==0 && 
                        <p className="rankingText">Δεν έχεις προσθέσει ακόμη ώρες μελέτης για το μάθημα!</p>
                    }
                    { studyHoursSum !== 0 &&
                        <p className="rankingText">Έχεις διαβάσει συνολικά 
                        <span className="positionNum">{studyHoursSum}</span>
                        ώρες για αυτό το μάθημα!
                    </p>}
                    { studyHoursAverage!==0&&
                        <p className="rankingText">Ο μέσος όρος μελέτης των φοιτητών που έχουν περάσει το μάθημα είναι
                            <span className="positionNum">{studyHoursAverage}</span>
                            ώρες.
                        </p>}
                    { studyHoursAverage!==0&&
                        <p className="rankingText">Οι περισσότερες ώρες μελέτης που έχουν σημειωθεί από μαθητή που πέρασε το μάθημα είναι
                        <span className="positionNum">{studyHoursMAX}</span>
                        !
                     </p>}

                    { studyHoursAverage!==0&&
                    <p className="rankingText">Οι λιγότερες ώρες μελέτης που έχουν σημειωθεί από μαθητή που πέρασε το μάθημα είναι
                        <span className="positionNum">{studyHoursMIN}</span>
                        !
                    </p>}
            </div>
           
        </div>

    );
}

export default StudentStudyHoursPrediction;