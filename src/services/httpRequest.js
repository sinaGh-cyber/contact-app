import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000/comments';

const httpRequests = {
  getAllComments() {
    return axios.get();
  },
  getSingleComment(id) {
    return axios.get(`/${id}`);
  },

  addNewComment(body) {
    return axios.post('', body);
  },

  deleteComment(id) {
    return axios.delete(`/${id}`);
  },

  updateComment(id, body) {
    return axios.put(`/${id}`, body);
  },
};

export { httpRequests };
