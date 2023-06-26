import React from 'react';
import { useEffect, useState } from 'react';

function StudentFinalMarkStatistics(props){

    const {finalMarkRankingPosition} = props;

    return(
        <>
           { finalMarkRankingPosition!== -1 &&
             <div className='fmRanking'>
                <span>Με βάση τον τελικό βαθμό του μαθήματος, βρίσκεσαι στην θέση νούμερο: 
                   <span className="positionNum">{finalMarkRankingPosition}</span> 
                ! </span>
            </div>
            }
            { finalMarkRankingPosition == -1 &&
              <div className='fmRanking'>
                <span> Πρόσθεσε τον τελικό βαθμό του μαθήματος για να δεις την θέση σου στην κατάταξη! </span>
              </div> }
        </>
    );

}

export default StudentFinalMarkStatistics;