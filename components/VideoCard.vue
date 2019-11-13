<template>
  <div class="column is-one-quarter">
    <div class="card" @mouseover="isHovering = true" @mouseleave="isHovering = false">
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="video.thumbnail" alt="" />
        </figure>
        <div v-show="isHovering" class="overlay" @click="activeModal">
          <div class="content">
            <div class="media-content">
              <p class="title is-4">{{ video.title }}</p>
            </div>
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M36.0001 70.0417C54.9273 70.0417 70.2709 54.6981 70.2709 35.7708C70.2709 16.8436 54.9273 1.5 36.0001 1.5C17.0728 1.5 1.72925 16.8436 1.72925 35.7708C1.72925 54.6981 17.0728 70.0417 36.0001 70.0417Z"
                stroke="white"
                stroke-width="2"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M37.6416 24.0209C49.5834 24.0209 59.1176 34.3359 59.514 34.7745C59.9561 35.2648 59.9561 36.0058 59.514 36.4961C59.1176 36.9346 49.5832 47.2497 37.6416 47.2497C25.7 47.2497 16.1656 36.9346 15.7691 36.4961C15.327 36.0058 15.327 35.2648 15.7691 34.7745C16.1656 34.3359 25.6998 24.0209 37.6416 24.0209ZM28.5345 35.6353C28.5345 40.6158 32.6204 44.6687 37.6416 44.6687C42.6627 44.6687 46.7487 40.6158 46.7487 35.6353C46.7487 30.6548 42.6627 26.6019 37.6416 26.6019C32.6204 26.6019 28.5345 30.6548 28.5345 35.6353Z"
                fill="white"
              />
              <path
                d="M39.0065 33.3807C39.0065 32.0748 39.6604 30.926 40.6551 30.2194C39.7625 29.7664 38.767 29.4865 37.6973 29.4865C34.0879 29.4865 31.1511 32.3982 31.1511 35.9769C31.1511 39.5555 34.0879 42.4673 37.6973 42.4673C40.9289 42.4673 43.6035 40.1278 44.1319 37.0709C41.4955 37.9125 39.0065 35.9355 39.0065 33.3807Z"
                fill="white"
              />
            </svg>
          </div>
          <button class="button is-dark is-small" @click="deleteVideo(video._id)">
            Delete
          </button>
        </div>
      </div>
      <div class="modal" :class="{ 'is-active is-clipped': isActiveModal }">
        <div class="modal-background" @click="closeModal"></div>
        <div class="modal-content">
          <p class="title is-4">{{ video.title }}</p>
          <video ref="player" controls :src="src"></video>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isHovering: false,
      isActiveModal: false,
      src: null
    };
  },
  methods: {
    deleteVideo(id) {
      if (!confirm('Are you sure ?')) {
        return;
      }
      this.$store
        .dispatch('videos/deleteVideo', id)
        .then(() => {})
        .catch(error => {
          throw error.message;
        });
    },
    activeModal() {
      this.isActiveModal = true;
      this.src = this.video.path;
    },
    closeModal() {
      this.isActiveModal = false;
      this.$refs.player.pause();
      this.$refs.player.currentTime = 0;
    }
  }
};
</script>

<style scoped>
.column {
  padding: 0.45em;
}

.card {
  transition: 0.3s all ease-in;
  cursor: pointer;
  background: #6913fe;
}

.card:hover {
  padding: 10px;
}

.card-image {
  position: relative;
}

img {
  object-fit: cover;
}

.overlay {
  background: rgba(105, 19, 254, 0.4);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  color: white;
  margin-bottom: 10px;
  font-size: 32px;
}

.modal-content {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

button {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
