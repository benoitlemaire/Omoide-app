<template>
  <section class="hero">
    <div class="overlay" />
    <video
      playsinline
      autoplay
      muted
      loop
    >
      <source
        :src="video.path"
      >
    </video>

    <div class="hero-body">
      <Search />
      <span>
        {{ video.title }}
      </span>
    </div>
  </section>
</template>


<script>
export default {
  components: {
    Search: () => import('@/components/Search.vue'),
  },
  props: {
    video: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 800px;
  margin-top: -52px;
  margin-bottom: 150px;
}

.search {
  z-index: 5;
  max-width: 530px;
  width: 100%;
  text-align: center;
}

span {
  color: white;
  text-align: center;
  position: absolute;
  bottom: 40px;
  font-size: 16px;
  line-height: 19px;
}

.hero-body {
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2;
}

video {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}
</style>
