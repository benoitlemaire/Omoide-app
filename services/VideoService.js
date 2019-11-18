// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getVideos() {
    return apiClient.get('/videos');
  },
  getVideo(id) {
    return apiClient.get(`/videos/${id}`);
  },
  postVideo(video) {
    return apiClient.post('/videos', video);
  },
  deleteVideo(id) {
    return apiClient.delete(`/videos/${id}`);
  },
};
