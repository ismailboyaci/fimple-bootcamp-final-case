import React, { useEffect, useState } from 'react';
import '~/styles/tickets-panel.scss';
import { Dropdown } from '~/shared';
import { useNavigate } from 'react-router-dom';
import withLoading from '~/hoc/withLoading';
import { getTickets } from '~/services';
import { categories, status } from '~/constants';
import { useTranslation } from 'react-i18next';

const pageOptions = [
  { text: '5', value: 5 },
  { text: '10', value: 10 },
  { text: '20', value: 20 }
];

const TicketsPanel = ({setLoading}) => {
  const { t } = useTranslation();
  const [ticketsData, setTicketsData] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const totalPages = Math.ceil(totalTickets / pageSize);
  const navigate = useNavigate();

  useEffect(() => {
    const getTicketData = async () => {
      setLoading(true);
      const result = await getTickets(currentPage, pageSize, '', '', sortBy, sortOrder);
      if(result.status === 200) {
        setTicketsData(result.data.data);
        setTotalTickets(result.data.totalRecords);
        setLoading(false);  
      }
    };

    getTicketData();
  }, [sortBy, sortOrder, currentPage, pageSize]);

  const sortData = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  }


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const gotoTicket = (ticketId) => {
    navigate(`application-detail?applicationId=${ticketId}`);
  };

  return (
    <div className='tickets-panel-wrapper'>
      <div className='ticket-table-wrapper'>
        <table>
          <thead>
            <tr>
              <th>{t('number_of')}</th>
              <th onClick={() => sortData('createdAt')}>{t('last_update')}</th>
              <th>{t('name')}</th>
              <th>{t('category')}</th>
              <th>{t('status')}</th>
              <th>{t('last_replier')}</th>
            </tr>
          </thead>
          <tbody>
            {ticketsData?.map((ticket, index) => (
              <tr key={index} onClick={() => gotoTicket(ticket._id)}>
                <td>{ticket._id}</td>
                <td>{new Date(ticket.updatedAt || ticket.createdAt).toLocaleString()}</td>
                <td>{`${ticket.firstname} ${ticket.lastname}`}</td>
                <td>{t(categories.find((category) => category.id == ticket?.subject)?.name || 'N/A')}</td>
                <td>{t(status.find((status) => status.id === ticket?.status)?.name)}</td>
                <td>{ticket.lastreply}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='pagination'>
          <div className='pagination-per'>
            <span className='pagination-span'>{t('per_page')}:</span>
            <Dropdown options={pageOptions} onSelect={(e) => setPageSize(e.value)} />
          </div>
          <div className='pagination-button'>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            {t('previous')}
          </button>
          <span className='pagination-span'>{currentPage}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            {t('next')}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLoading(TicketsPanel);
