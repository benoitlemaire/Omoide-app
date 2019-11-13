<template>
  <div>
    <h1>Add new video</h1>
    <form @submit.prevent="createVideo">
      <BaseInput v-model.trim="video.title" label="Title" placeholder="Title" type="text" />
      <BaseInput v-model.trim="video.url" label="Url Youtube" placeholder="Url" type="text" />

      <BaseInput
        v-model.trim="video.startTime"
        label="Start time"
        placeholder="00:02:35"
        type="text"
        @input="formatDate"
      />

      <BaseInput
        v-model.trim="endTime"
        label="End time"
        placeholder="00:02:35"
        type="text"
        @input="formatDate"
      />

      <button @click.prevent="setDurationTime">convert time</button>

      <b>Duration video is : {{ durationFront }}</b>
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
      endTime: '',
      durationFront: null
    };
  },
  created() {
    if (this.video.startTime && this.endTime !== '') {
      this.setDurationTime();
    }
  },
  methods: {
    setDurationTime() {
      const start = this.formatDate(this.video.startTime);
      const end = this.formatDate(this.endTime);

      this.video.duration = end - start;
      if (this.video.duration <= 60) {
        this.durationFront = this.video.duration + ' secondes';
      } else {
        this.durationFront = moment.utc(this.video.duration * 1000).format('H:m:s') + ' minutes';
      }
    },
    formatDate(inputTime) {
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
      this.video.startTime = this.formatDate(this.video.startTime);

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
