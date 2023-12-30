import axios from 'axios';

const BASE_URL = 'https://ticket-management-fe3dfc84f4a8.herokuapp.com/';

const registerUser = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}register`, data);
    return response;
  } catch (error) {
    console.log('Error while calling register API ', error);
  }
};

const login = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}login`, data);
    return response;
  } catch (error) {
    console.log('Error while calling login API ', error);
  }
};

const logout = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}logout`, data);
    return response;
  } catch (error) {
    console.log('Error while calling logout API ', error);
  }
};

const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}getUsers`);
    return response;
  } catch (error) {
    console.log('Error while calling getUsers API ', error);
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}deleteUser/${userId}`);
    return response;
  } catch (error) {
    console.log('Error while calling deleteUser API ', error);
  }
}

export { registerUser, login, logout, getUsers, deleteUser };

