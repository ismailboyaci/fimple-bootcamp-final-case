import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '~/services';

const useApplications = (id = null, ticketsPerPage = 3) => {
  const [ticketsData, setTicketsData] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getApplications = async () => {
      const tickets = [];
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, 'applications'));

        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          tickets.push(doc.data());
        });
      } catch (error) {
        console.log(error);
      } finally {
        setTotalTickets(tickets.length);
        setIsLoading(false);

        if (id) {
          // If an id is provided, filter the tickets array based on the id
          const filteredTickets = tickets.filter((ticket) => ticket.id === id);
          setTicketsData(filteredTickets);
        } else {
          // If no id is provided, slice the tickets array based on pagination
          setTicketsData(tickets.slice(0, ticketsPerPage));
        }
      }
    };

    getApplications();
  }, [id, ticketsPerPage]);

  return { ticketsData, totalTickets };
};

export default useApplications;