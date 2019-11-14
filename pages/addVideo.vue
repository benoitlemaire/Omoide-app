<template>
  <div>
    <h1>Add new video</h1>
    <form @submit.prevent="createVideo">
      <BaseInput
        v-model.trim="video.title"
        label="Title"
        placeholder="Title"
        type="text"
      />
      <BaseInput
        v-model.trim="video.url"
        label="Url Youtube"
        placeholder="Url"
        type="text"
      />

      <Preview
        v-on:addStartTime="addStartTime"
        v-on:addEndTime="addEndTime"
        v-on:getDurationTime="getDurationTime"
        v-if="video.url"
        :videoId="getYoutubeID(video.url)"
      />

      <BaseInput
        v-model.trim="video.startTime"
        disabled
        label="Start time"
        placeholder="00:02:35"
        type="text"
      />

      <BaseInput
        v-model.trim="endTime"
        disabled
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
import 'moment-duration-format';

export default {
  components: {
    BaseInput: () => import('@/components/BaseInput.vue'),
    BaseButton: () => import('@/components/BaseButton.vue'),
    Preview: () => import('@/components/Preview.vue'),
  },
  data() {
    return {
      video: this.createFreshVideoObject(),
      endTime: ''
    };
  },
  methods: {
    addStartTime(time) {
      this.video.startTime = this.convertTime(time);
    },
    addEndTime(time) {
      this.endTime = this.convertTime(time);
    },
    getDurationTime(durationTime) {
      this.video.duration = this.convertTime(durationTime);
    },
    convertTime(time) {
      // Seconds to hh:mm:ss
      if (typeof time === 'number') {
        const duration = moment.duration(time, 'seconds');
        const hms = duration.format('hh:mm:ss');
        return hms;
      }

      // String hh:mm:ss to seconds
      const a = time.split(':');
      if (a.length === 1) {
        time = '00:00:' + time;
        return moment.duration(time).asSeconds();
      } else if (a.length === 2) {
        time = '00:' + time;
        return moment.duration(time).asSeconds();
      }
      return moment.duration(time).asSeconds();
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
      this.video.startTime === '00'
        ? (this.video.startTime = '00:00:00')
        : (this.video.startTime = this.convertTime(this.video.startTime));

      this.video.duration = this.convertTime(this.video.duration);

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
      this.endTime = '';
      return {
        title: 'titre',
        url: '',
        startTime: '',
        duration: ''
      };
    }
  }
};
</script>

<style>
/*
  Start time: 04:49
  End time: 25:46

  Duration: 20:57

 */
</style>
