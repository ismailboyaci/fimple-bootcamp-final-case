import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';

const StatusTable = ({ statusData, renderCustomizedLabel, COLORS }) => {
  const { t } = useTranslation();
  return (
    <>
      {statusData.map((statusCount, index) => (
        <div key={`status-${index}`}>
          <p className='title-report'>{t(statusCount.status.name)}</p>
        <PieChart width={200} height={200}>
          <Pie
            data={statusCount.data}
            cx={100}
            cy={100}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill='#8884d8'
            dataKey='value'
          >
            {statusCount.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <p>{t('total_application')}{' : '+ statusCount.data.length}</p>
        <ul>
          {statusCount.data.map((entry, index) => (
            <li key={index} style={{ color: `${COLORS[index % COLORS.length]}` }}>
              {t(entry.name)}: {entry.value}
            </li>
          ))}
        </ul>
      </div>
      ))}
    </>
  );
};

export default StatusTable;
