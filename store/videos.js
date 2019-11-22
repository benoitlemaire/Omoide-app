// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
// eslint-disable-next-line import/no-unresolved
import VideoService from '@/services/VideoService';

export const state = () => ({
  allVideos: [],
  videos: [],
  video: {},
  page: 2,
  totalPages: 0,
  searchIsActive: false,
});

export const mutations = {
  setTotalPage(state, total) {
    Vue.set(state, 'totalPages', total);
  },
  increasePage(state, page) {
    Vue.set(state, 'page', page);
  },
  addVideo(state, video) {
    state.videos.push(video);
  },
  setVideos(state, videos) {
    Vue.set(
      state, 'videos', videos,
    );
  },
  setAllVideos(state, videos) {
    Vue.set(
      state, 'allVideos', videos,
    );
  },
  setVideo(state, video) {
    Vue.set(
      state, 'video', video,
    );
  },
  updateSearch(state, bool) {
    Vue.set(state, 'searchIsActive', bool);
  },
  deleteVideo(state, id) {
    const index = state.videos.findIndex((video) => video.id === id);
    state.videos.splice(index, 1);
  },
  resetPage(state) {
    Vue.set(state, 'page', 2);
  },
};
export const actions = {
  resetInfiniteScroll({ commit }) {
    commit('resetPage');
  },
  createVideo({ commit }, video) {
    return VideoService.postVideo(video)
      .then(() => {
        commit('addVideo', video);
      })
      .catch((error) => {
        throw error.message;
      });
  },
  deleteVideo({ commit }, id) {
    return VideoService.deleteVideo(id)
      .then(() => {
        commit('deleteVideo', id);
      })
      .catch((error) => {
        throw error;
      });
  },
  fetchVideos({ commit }) {
    return VideoService.getVideos().then((response) => {
      commit('setVideos', response.data);
    });
  },
  fetchAllVideos({ commit }) {
    return VideoService.getAllVideos().then((response) => {
      commit('setAllVideos', response.data);
      const totalItems = response.data.length;
      const total = Math.ceil(totalItems / 6);

      commit('setTotalPage', total);
    });
  },
  addVideosPerPage({ commit, state }) {
    return VideoService.getVideosPerPage(state.page).then((response) => {
      const videos = response.data;

      videos.forEach((video) => {
        commit('addVideo', video);
      });
      commit('increasePage', state.page + 1);
    }).catch((err) => {
      const error = false;
      commit('setScrollStatus', error);
    });
  },
  fetchVideo({ commit }, id) {
    return VideoService.getVideo(id).then((response) => {
      commit('setVideo', response.data);
    });
  },
};
