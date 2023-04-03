import React from "react";

function StudentPlan(){
    return(
        <div class="mainBox">
            <div class="boxHeader">
                <div class="titleBox">
                    <div class="boxSVG">
                    <svg width="22" height="22" viewBox="0 0 48 48"><g fill="none" stroke="#FFFFFF" stroke-width="4"><path stroke-linejoin="round" d="M5 19h38v22a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V19Zm0-9a2 2 0 0 1 2-2h34a2 2 0 0 1 2 2v9H5v-9Z"/><path stroke-linecap="round" stroke-linejoin="round" d="m16 31l6 6l12-12"/><path stroke-linecap="round" d="M16 5v8m16-8v8"/></g></svg>
                    </div>
                    <span>Το πλάνο της εβδομάδας</span>
                </div>
            </div>

            <div class="courseTableBox"> 
                <table class="crsSecrTable">
                <thead class="courseTableHeader">
                    <tr class="tableHeader">
                        <th>Δευτέρα</th>
                        <th>Τρίτη</th>
                        <th>Τετάρτη</th>
                        <th>Πέμπτη</th>
                        <th>Παρασκευή</th>
                        <th>Σάββατο</th>
                        <th>Κυριακή</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
                </table>
            </div>

        </div>
    );
}

export default StudentPlan;