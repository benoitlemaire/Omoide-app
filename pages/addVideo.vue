<template>
  <div>
    <h1>Add new video</h1>
    <form @submit.prevent="createVideo">
      <BaseInput v-model.trim="video.title" label="Title" placeholder="Title" type="text" />
      <BaseInput v-model.trim="video.url" label="Url Youtube" placeholder="Url" type="text" />

      <BaseInput
        @input="displayDurationTime"
        v-model.trim="video.startTime"
        label="Start time"
        placeholder="00:02:35"
        type="text"
      />

      <BaseInput
        @input="displayDurationTime"
        v-model.trim="endTime"
        label="End time"
        placeholder="00:02:35"
        type="text"
      />

      <b v-if="video.duration">Duration video is : {{ video.duration }} minutes</b>
      <BaseButton type="submit">Envoyer</BaseButton>
    </form>
  </div>
</template>

<script>
import moment from 'moment';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
  components: {
    BaseInput,
    BaseButton
  },
  data() {
    return {
      video: this.createFreshVideoObject(),
      endTime: ''
    };
  },
  methods: {
    displayDurationTime() {
      if (this.video.startTime && this.endTime !== '') {
        this.setDurationTime();
      }
    },
    setDurationTime() {
      const start = this.formatToSeconds(this.video.startTime);
      const end = this.formatToSeconds(this.endTime);

      this.video.duration = end - start;
      this.video.duration = moment.utc(this.video.duration * 1000).format('HH:mm:ss');
    },
    formatToSeconds(inputTime) {
      const a = inputTime.split(':');
      const seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

      return seconds;
    },
    getYoutubeID(url) {
      let ID = '';
      url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      if (url[2] !== undefined) {
        // eslint-disable-next-line no-useless-escape
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
      } else {
        ID = url;
      }
      return ID;
    },
    createVideo() {
      this.$nuxt.$loading.start();

      this.video.url = this.getYoutubeID(this.video.url);

      // Convert string to seconds before request
      this.video.startTime = this.formatToSeconds(this.video.startTime);
      this.video.duration = this.formatToSeconds(this.video.duration);

      this.$store
        .dispatch('videos/createVideo', this.video)
        .then(() => {
          this.$nuxt.$loading.finish();
          this.$router.push({
            name: 'index'
          });
        })
        .catch(error => {
          throw error.message;
        });
      this.video = this.createFreshVideoObject();
    },
    createFreshVideoObject() {
      return {
        title: '',
        url: '',
        startTime: '',
        duration: ''
      };
    }
  }
};
</script>

<style></style>
