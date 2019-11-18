<template>
  <youtube
    ref="youtube"
    :video-id="videoId"
    :fit-parent="true"
    :resize="true"
  />
</template>

<script>
export default {
  props: {
    videoId: {
      type: String,
      default: '',
    },
    triggerGetTime: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      startTime: '',
      endTime: '',
    };
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
  },
  methods: {
    getTime(option) {
      this.player
        .getCurrentTime()
        .then((result) => {
          const currentTime = this.roundDecimal(result);

          if (option === 0) {
            this.startTime = currentTime;
            this.$emit('addStartTime', this.startTime);

            return;
          }

          this.endTime = currentTime;
          this.$emit('addEndTime', this.endTime);
          this.$emit('getDurationTime', this.endTime - this.startTime);
        })
        .catch((error) => {
          throw error;
        });
    },
    roundDecimal(nombre, precision) {
      const afterComma = precision || 1;
      const tmp = 10 ** afterComma;
      return Math.round(nombre * tmp) / tmp;
    },
  },
};
</script>

<style scoped>
</style>
