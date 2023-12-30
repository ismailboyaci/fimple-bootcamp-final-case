import React from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const CategoryTable = ({ subjectStatusCounts, renderCustomizedLabel, COLORS, categories }) => {
  const { t } = useTranslation();
  return (
    <>
      {subjectStatusCounts.map((subjectStatusCount) => (
       <div key={subjectStatusCount.subject}>
       <PieChart width={200} height={200}>
       <Tooltip enabled={true} cornerRadius={15} ></Tooltip>
         <Pie
           data={subjectStatusCount.data}
           cx={100}
           cy={100}
           labelLine={false}
           label={renderCustomizedLabel}
           outerRadius={80}
           fill='#8884d8'
           dataKey='value'
         >
           {subjectStatusCount.data.map((entry, index) => (
             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
           ))}
         </Pie>
       </PieChart>
       <p>{t(categories.find((category) => category.id === subjectStatusCount.subject).name)}</p>
       <p>{t('total_application') + ' : ' + subjectStatusCount.data.length}</p>
       <ul>
         {subjectStatusCount.data.map((entry, index) => (
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

export default CategoryTable;
