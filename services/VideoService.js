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
  getAllVideos() {
    return apiClient.get('/videos');
  },
  getVideos() {
    return apiClient.get('/videos/1');
  },
  getVideosPerPage(page) {
    return apiClient.get(`/videos/${page}`);
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
