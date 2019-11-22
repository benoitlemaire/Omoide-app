<template>
  <div>
    <client-only>
      <Hero
        :video="randomVideo"
      />
    </client-only>

    <div class="columns">
      <VideoCard
        v-for="(video, index) in videos"
        :key="index"
        :video="video"
        :data-index="index"
      />
    </div>
    <infinite-loading
      v-if="!searchIsActive"
      :distance="10"
      @infinite="loadMore"
    >
      <span
        slot="no-more"
      >
        Il n'y a plus de vidéos
      </span>
    </infinite-loading>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {
    VideoCard: () => import('@/components/VideoCard.vue'),
    Hero: () => import('@/components/Hero.vue'),
    InfiniteLoading: () => import('vue-infinite-loading'),
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('videos/fetchVideos');
      await store.dispatch('videos/fetchAllVideos');
    } catch (e) {
      error({
        statusCode: 503,
        message: e.message,
      });
    }
  },
  computed: mapState({
    totalPages: (state) => state.videos.totalPages,
    page: (state) => state.videos.page,
    searchIsActive: (state) => state.videos.searchIsActive,
    videos: (state) => state.videos.videos,
    infiniteScrollStatus: (state) => state.videos.infiniteScrollStatus,
    randomVideo() {
      return this.videos[Math.floor(Math.random() * this.videos.length)];
    },
  }),
  methods: {
    loadMore($state) {
      setTimeout(() => {
        $state.loaded();
        this.$store.dispatch('videos/addVideosPerPage');

        if (this.totalPages === this.page) {
          $state.complete();
        }
      }, 500);
    },
  },
};
</script>

<style scoped>
.columns {
  flex-wrap: wrap;
  margin: -0.45em;
}

button {
  margin-bottom: 50px;
}
</style>
