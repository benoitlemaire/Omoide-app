import VideoService from '@/services/VideoService.js'

export const state = () => ({
  videos: [],
  video: {}
})
export const mutations = {
  ADD_VIDEO(state, video) {
    state.videos.push(video)
  },
  SET_VIDEOS(state, videos) {
    state.videos = videos
  },
  SET_VIDEO(state, video) {
    state.video = video
  },
  DELETE_VIDEO(state, id) {
    const index = state.videos.findIndex((video) => video._id === id)
    state.videos.splice(index, 1)
  }
}
export const actions = {
  createVideo({ commit, dispatch }, video) {
    return VideoService.postVideo(video)
      .then(() => {
        commit('ADD_VIDEO', video)
      })
      .catch((error) => {
        throw error.message
      })
  },
  deleteVideo({ commit }, id) {
    return VideoService.deleteVideo(id)
      .then((response) => {
        commit('DELETE_VIDEO', id)
      })
      .catch((error) => {
        throw error
      })
  },
  fetchVideos({ commit }) {
    return VideoService.getVideos().then((response) => {
      commit('SET_VIDEOS', response.data)
    })
  },
  fetchVideo({ commit }, id) {
    return VideoService.getVideo(id).then((response) => {
      commit('SET_VIDEO', response.data)
    })
  }
}
