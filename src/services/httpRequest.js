import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000/contacts';

const httpRequests = {
  getAllContacts() {
    return axios.get();
  },
  getSingleContact(id) {
    return axios.get(`/${id}`);
  },

  addNewContact(body) {
    return axios.post('', body);
  },

  deleteContact(id) {
    return axios.delete(`/${id}`);
  },

  updateContact(id, body) {
    return axios.put(`/${id}`, body);
  },
};

export { httpRequests };
