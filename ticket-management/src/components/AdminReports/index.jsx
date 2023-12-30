import { useEffect, useState, useMemo } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { status } from '~/constants';
import { categories } from '~/constants';
import { getTickets } from '~/services';
import '~/styles/admin-reports.scss';
import { CategoryTable, StatusTable } from '~/shared';
import withLoading from '~/hoc/withLoading';
import { useTranslation } from 'react-i18next';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

const tabs = [
  {
    id: 1,
    name: 'categories',
  },
  {
    id: 2,
    name: 'statuss',
  },
];

const AdminReports = ({setLoading}) => {
    const { t } = useTranslation();
    const [subjectStatusCounts, setSubjectStatusCounts] = useState([]);
    const [currentTab, setCurrentTab] = useState(1);
    const [statusData, setStatusData] = useState([]);

    const mapStatusToLabel = useMemo(
    () => (statusCode) => {
      const label = status.find((status) => status.id == statusCode);
      return label ? label.name : '';
    },
    [],
  );

  const mapCategoryToLabel = useMemo(
    () => (categoryCode) => {
      const label = categories.find((category) => category.id == categoryCode);
      return label ? label.name : '';
    },
    [],
  );

  const renderCustomizedLabel = useMemo(
    () =>
      ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
          <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      },
    [],
  );

  const [debouncedCurrentTab, setDebouncedCurrentTab] = useState(currentTab);

  useEffect(() => {
    const delay = 500;
    const timeoutId = setTimeout(() => {
      setDebouncedCurrentTab(currentTab);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [currentTab]);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
      const subjects = [1, 2, 3, 4, 5];
      const updatedCounts = [];

      if (currentTab === 2) {

        for (const s of status) {
          const response = await getTickets(1, 10, s.id, '', '', '');

          if (response && response.data) {
            const statusCounts = response.data.data.reduce((counts, ticket) => {
              const ticketSubject = mapCategoryToLabel(ticket.subject);

              if (counts[ticketSubject]) {
                counts[ticketSubject]++;
              } else {
                counts[ticketSubject] = 1;
              }

              return counts;
            }, {});
            updatedCounts.push({
              status: s,
              data: Object.entries(statusCounts).map(([name, value]) => ({
                name,
                value,
              })),
            });
          }
        }
        setStatusData(updatedCounts);
      } else {
        for (const subject of subjects) {
          const response = await getTickets(1, 10, '', subject, '', '');

          if (response && response.data) {
            const statusCounts = response.data.data.reduce((counts, ticket) => {
              const ticketStatus = mapStatusToLabel(ticket.status);

              if (counts[ticketStatus]) {
                counts[ticketStatus]++;
              } else {
                counts[ticketStatus] = 1;
              }

              return counts;
            }, {});

            updatedCounts.push({
              subject: subject,
              data: Object.entries(statusCounts).map(([name, value]) => ({
                name,
                value,
              })),
            });
          }
        }

        setSubjectStatusCounts(updatedCounts);
      }
    };

    fetchData().finally(() => {
        setLoading(false);
    })
  }, [debouncedCurrentTab]);

  const setTab = (index) => {
    setCurrentTab(index);
  };

  return (
    <div className='admin-reports-wrapper'>
      <div className='tab-wrapper'>
        {tabs.map((tab) => (
          <div key={tab.id} onClick={() => setTab(tab.id)} className={`tablinks ${currentTab === tab.id ? 'active' : ''}`}>
            {t(tab.name)}
          </div>
        ))}
      </div>
      <div className='pie-chart-container'>
        {currentTab === 2 ? (
          <StatusTable statusData={statusData} renderCustomizedLabel={renderCustomizedLabel} COLORS={COLORS} />
        ) : (
          <CategoryTable
            subjectStatusCounts={subjectStatusCounts}
            renderCustomizedLabel={renderCustomizedLabel}
            COLORS={COLORS}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
};

export default withLoading(AdminReports);

