<template>
  <div class="search">
    <span>Watch the best moments of your favorite animes ! </span>
    <BaseInput
      v-model="search"
      placeholder="Look for Fairy Tail, Hunter x Hunter, Soul Eater …"
      type="search"
      @input="filterResults"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {
    BaseInput: () => import('@/components/BaseInput.vue'),
  },
  data() {
    return {
      search: null,
    };
  },
  computed: mapState({
    allVideos: (state) => state.videos.allVideos,
  }),
  methods: {
    filterResults() {
      const result = this.allVideos.filter((video) => video.title
        .toLowerCase()
        .includes(this.search
          .toLowerCase()));
      this.$store.commit('videos/setVideos', result);
      this.$store.commit('videos/updateSearch', true);

      if (this.search === '') {
        this.$store.commit('videos/updateSearch', false);
        this.$store.dispatch('videos/fetchVideos');
        this.$store.dispatch('videos/resetInfiniteScroll');
      }
    },
  },
};
</script>

<style scoped>
span {
  font-size: 32px;
  line-height: 45px;
  color: white;
  display: block;
  margin-bottom: 45px;
}
</style>
