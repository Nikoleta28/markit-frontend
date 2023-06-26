import React from 'react';
import { useEffect, useState } from 'react';


function StudentAssignmentMarksRanking(props){

    const {assMarkRankingPosition} = props;

    return(

        <>
           {assMarkRankingPosition!== -1 && assMarkRankingPosition !==0 &&
             <div className='fmRanking'>
               <span>Με βάση το σύνολο των βαθμολογιών των εργασιών σου , βρίσκεσαι στην θέση νούμερο: 
                   <span className="positionNum"> {assMarkRankingPosition} </span> 
                  !</span> 
            </div>
            }
            { assMarkRankingPosition == -1 &&
              <div className='fmRanking'>
                <span> Πρόσθεσε τους βαθμούς των εργασιών του μαθήματος για να δεις την θέση σου στην κατάταξη! </span>
              </div> }

              { assMarkRankingPosition == 0 &&
              <div className='fmRanking'>
                <span> Δεν έχουν προστεθεί ακόμη εργασίες για αυτό το μάθημα! </span>
              </div> }
        </>

    );
}

export default StudentAssignmentMarksRanking;