import React, { useState ,useEffect }  from "react";
import  { PureComponent } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function StudentStudyHoursChart(props){

    const { studyHoursList } = props;
    const yTicks = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return(
        <div className='asMarkStats' id="chart" >

            <span className='statsHeader'>Ώρες μελέτης μαθήματος:</span>

            <div style={{ width: '100%', height: '100%' }}>
             <ResponsiveContainer width="100%"  height={300}>
                <LineChart
                width={500}
                height={300}
                data={studyHoursList}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                {/* <XAxis  /> */}
                <YAxis domain={[0, 10]} 
                      ticks={yTicks}  
                      tick={{ style: { fill: '#ffffff' } }} 
                      axisLine={{ stroke: '#ffffff' }}  
                      tickLine={{ stroke: '#ffffff' }}/>
                <Tooltip content={<CustomTooltip />}/>
                <Legend />
                {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                <Line type="monotone" dataKey="hours" stroke="#40E0D0" />
                </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
    );
}

export default StudentStudyHoursChart;


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const { start, value } = payload[0].payload; // Extracting the start and value properties from the payload
    
        return (
          <div className="custom-tooltip">
            <p className="label">{`${start}`}</p>
            <p className="desc">Για αυτή την ημερομηνία μελετήσατε {payload[0].value} ώρα/ώρες.</p>
          </div>
        );
      }

  return null;
};