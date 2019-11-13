<template>
  <div>
    <div class="columns">
      <VideoCard v-for="(video, index) in videos" :key="index" :video="video" :data-index="index" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VideoCard from '@/components/VideoCard.vue';

export default {
  components: {
    VideoCard
  },
  computed: mapState({
    videos: state => state.videos.videos
  }),
  async fetch({ store, error }) {
    try {
      await store.dispatch('videos/fetchVideos');
    } catch (e) {
      error({
        statusCode: 503,
        message: e.message
      });
    }
  }
};
</script>

<style scoped>
.columns {
  flex-wrap: wrap;
  margin: -0.45em;
  background: #141414;
}
</style>
