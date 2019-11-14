<template>
  <div>
    <youtube ref="youtube" :video-id="videoId"></youtube>

    <button @click.prevent="getTime(0)">Start Time</button>
    <button @click.prevent="getTime(1)">End Time</button>
  </div>
</template>

<script>
export default {
  props: {
    videoId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      startTime: '',
      endTime: ''
    };
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    }
  },
  methods: {
    playVideo() {
      this.player.playVideo();
    },
    getTime(option) {
      this.player
        .getCurrentTime()
        .then(result => {
          const currentTime = this.roundDecimal(result);
          if (option === 0) {
            this.startTime = currentTime;
            this.$emit('addStartTime', this.startTime);
          } else {
            this.endTime = currentTime;
            this.$emit('addEndTime', this.endTime);
            this.$emit('getDurationTime', this.endTime - this.startTime);
          }
        })
        .catch(error => {
          throw error;
        });
    },
    roundDecimal(nombre, precision) {
      precision = precision || 1;
      const tmp = 10 ** precision;
      return Math.round(nombre * tmp) / tmp;
    }
  }
};
</script>

<style></style>
