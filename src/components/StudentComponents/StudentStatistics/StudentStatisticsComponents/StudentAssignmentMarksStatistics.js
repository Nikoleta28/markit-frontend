import React, { PureComponent } from 'react';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer ,Text} from 'recharts';
// import styles from './BarChart.module.css';

function StudentAssignmentMarksStatistics(props){

    const { asMarkList } = props;
   

    const yTicks = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const renderCustomAxisTick = (tickProps) => {
      const { x, y, payload } = tickProps;
  
      return (
        <Text x={x} y={y} fill="#8884d8" fontSize={12} textAnchor="middle">
          {payload.value}
        </Text>
      );
    };


    
    
return(
  <div className='asMarkStats'>

   <span className='statsHeader'>Βαθμολογίες εργασιών μαθήματος:</span>

    <div style={{ width: '100%', height: '100%' }}>
     <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={500}
            height={300}
            data={asMarkList}
            margin={{
              top: 5,
              right:30,
              left: 30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="assignmentName" tick={{ style: { fill: '#ffffff' } }}   axisLine={{ stroke: '#ffffff' }}  tickLine={{ stroke: '#ffffff' }}/>
            <YAxis domain={[0, 10]} ticks={yTicks}  tick={{ style: { fill: '#ffffff' } }}  axisLine={{ stroke: '#ffffff' }}  tickLine={{ stroke: '#ffffff' }}/>
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend /> */}
            <Bar dataKey="mark" barSize={20} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
</div>
);

}

export default StudentAssignmentMarksStatistics;


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const assignment = payload[0].payload;

    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="desc">Ο βαθμός σου σε αυτή την εργασία είναι {payload[0].value}.</p>
        <p className="desc">Συγκριτικά με όλες τις βαθμολογίες που παραδόθηκαν για την συγκεκριμένη εργασία, η δική σου βρίσκεται στην {assignment.placement}η θέση!</p> 
      </div>
    );
  }

  return null;
};