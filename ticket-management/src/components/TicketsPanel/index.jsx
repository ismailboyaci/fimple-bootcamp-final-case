import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '~/services';
import '~/styles/tickets-panel.scss';
import { Dropdown } from '~/shared';
import { useNavigate } from 'react-router-dom';
import withLoading from '~/hoc/withLoading';

const pageOptions = [
  { text: '3', value: 3 },
  { text: '5', value: 5 },
  { text: '10', value: 10 },
  { text: '20', value: 20 }
];

const TicketsPanel = ({setLoading}) => {
  const [ticketsData, setTicketsData] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage, setTicketsPerPage] = useState(3);
  const totalPages = Math.ceil(totalTickets / ticketsPerPage);
  const navigate = useNavigate();

  useEffect(() => {
    const getTickets = async () => {
      const startIndex = (currentPage - 1) * ticketsPerPage;
      const endIndex = startIndex + ticketsPerPage;

      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'applications'));
        const tickets = querySnapshot.docs.map((doc) => doc.data());
        setTicketsData(tickets.slice(startIndex, endIndex));
        setTotalTickets(tickets.length);
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false);
      }
    };

    getTickets();
  }, [currentPage, ticketsPerPage]);

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
              <th>Application ID</th>
              <th>Last Update Date</th>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Last Replier</th>
            </tr>
          </thead>
          <tbody>
            {ticketsData.map((ticket, index) => (
              <tr key={index} onClick={() => gotoTicket(ticket.id)}>
                <td>{ticket.id}</td>
                <td>{new Date(ticket.updatedAt || ticket.createdAt).toLocaleString()}</td>
                <td>{`${ticket.firstName} ${ticket.lastName}`}</td>
                <td>{ticket.applicationSubject}</td>
                <td>{ticket.status || 'open'}</td>
                <td>{ticket.lastReplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='pagination'>
          <div className='pagination-per'>
            <span className='pagination-span'>Per Page:</span>
            <Dropdown options={pageOptions} onSelect={(e) => setTicketsPerPage(e.value)} />
          </div>
          <div className='pagination-button'>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span className='pagination-span'>{currentPage}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLoading(TicketsPanel);
