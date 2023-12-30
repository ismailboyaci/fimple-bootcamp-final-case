import axios from 'axios';

const BASE_URL = 'https://ticket-management-fe3dfc84f4a8.herokuapp.com/';

const createTicket = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}createTicket`, data);
    return response;
  } catch (error) {
    console.log('Error while calling createTicket API ', error);
  }
};

const getTicketById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}getTicketById/${id}`);
    return response;
  } catch (error) {
    console.log('Error while calling getTicketById API ', error);
  }
};

const getTickets = async (page, pageSize, status, subject, sortBy, sortOrder) => {
  try {
    const response = await axios.get(`${BASE_URL}getTickets`, {
      params: {
        page: page || 1,
        pageSize: pageSize || 10,
        status: status,
        subject: subject,
        sortBy: sortBy || 'createdAt',
        sortOrder: sortOrder || 'desc',
      },
    });
    return response;
  } catch (error) {
    console.log('Error while calling getTickets API ', error);
  }
};

const updateTicket = async (id, data) => {
  try {
    const response = await axios.patch(`${BASE_URL}updateTicket/${id}`, data);
    return response;
  } catch (error) {
    console.log('Error while calling updateTicket API ', error);
  }
};


export { createTicket, getTicketById, getTickets, updateTicket };

