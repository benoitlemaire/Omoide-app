import VideoService from '@/services/VideoService.js';

export const state = () => ({
  videos: [],
  video: {}
});
export const mutations = {
  addVideo(state, video) {
    state.videos.push(video);
  },
  setVideos(state, videos) {
    state.videos = videos;
  },
  setVideo(state, video) {
    state.video = video;
  },
  deleteVideo(state, id) {
    const index = state.videos.findIndex(video => video._id === id);
    state.videos.splice(index, 1);
  }
};
export const actions = {
  createVideo({ commit }, video) {
    return VideoService.postVideo(video)
      .then(() => {
        commit('addVideo', video);
      })
      .catch(error => {
        throw error.message;
      });
  },
  deleteVideo({ commit }, id) {
    return VideoService.deleteVideo(id)
      .then(response => {
        commit('deleteVideo', id);
      })
      .catch(error => {
        throw error;
      });
  },
  fetchVideos({ commit }) {
    return VideoService.getVideos().then(response => {
      commit('setVideos', response.data);
    });
  },
  fetchVideo({ commit }, id) {
    return VideoService.getVideo(id).then(response => {
      commit('setVideo', response.data);
    });
  }
};
