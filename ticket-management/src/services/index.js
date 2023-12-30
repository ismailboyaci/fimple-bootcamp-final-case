import { firebaseAuth, db, storage } from './firebase/firebase';
import { createTicket, getTicketById, getTickets, updateTicket } from './ticketServices';
import { registerUser, login, logout, getUsers,deleteUser } from './AuthService';
export { 
    firebaseAuth, 
    db, 
    storage, 
    createTicket, 
    getTicketById, 
    getTickets, 
    updateTicket, 
    registerUser, 
    login, 
    logout, 
    getUsers, 
    deleteUser 
};

