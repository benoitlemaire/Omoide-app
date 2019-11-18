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
        v-if="video.url"
        :video-id="getYoutubeID(video.url)"
        @addStartTime="addStartTime"
        @addEndTime="addEndTime"
        @getDurationTime="getDurationTime"
      />

      <p>Début: {{ startTimeFront }}</p>
      <p>Fin: {{ endTimeFront }}</p>
      <p>Durée: {{ durationFront }}</p>

      <BaseButton type="submit">
        Envoyer
      </BaseButton>
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
      startTimeFront: '',
      endTimeFront: '',
      durationFront: '',
    };
  },
  methods: {
    addStartTime(time) {
      this.video.startTime = time;
      this.startTimeFront = this.convertTime(time);
    },
    addEndTime(time) {
      this.endTimeFront = this.convertTime(time);
    },
    getDurationTime(durationTime) {
      this.video.duration = durationTime;
      this.durationFront = this.convertTime(durationTime);
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
        const newTime = `00:00:${time}`;
        return moment.duration(newTime).asSeconds();
      } if (a.length === 2) {
        const newTime = `00:${time}`;
        return moment.duration(newTime).asSeconds();
      }

      return moment.duration(time).asSeconds();
    },
    getYoutubeID(url) {
      let ID = '';
      const newUrl = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      if (newUrl[2] !== undefined) {
        // eslint-disable-next-line no-useless-escape
        ID = newUrl[2].split(/[^0-9a-z_\-]/i);
        [ID] = ID; // Is same as let ID = ID[0]
      } else {
        ID = newUrl;
      }
      return ID;
    },
    createVideo() {
      this.$nuxt.$loading.start();
      this.video.url = this.getYoutubeID(this.video.url);

      this.$store
        .dispatch('videos/createVideo', this.video)
        .then(() => {
          this.$nuxt.$loading.finish();
          this.$router.push({
            name: 'index',
          });
        })
        .catch((error) => {
          throw error.message;
        });
      this.video = this.createFreshVideoObject();
    },
    createFreshVideoObject() {
      this.endTime = '';
      return {
        title: '',
        url: 'https://www.youtube.com/watch?v=11-lpoJHu0U',
        startTime: '',
        duration: '',
      };
    },
  },
};
</script>
