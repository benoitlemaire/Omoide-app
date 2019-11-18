<template>
  <div>
    <h1 class="title has-text-centered">
      Ajouter une vidéo
    </h1>
    <form @submit.prevent="createVideo">
      <BaseInput
        v-model.trim="video.url"
        placeholder="Lien de la vidéo Youtube"
        type="text"
      />

      <div class="columns">
        <div class="column">
          <Preview
            v-if="video.url"
            ref="youtubePlayer"
            :video-id="getYoutubeID(video.url)"
            @addStartTime="addStartTime"
            @addEndTime="addEndTime"
            @getDurationTime="getDurationTime"
            @triggerGetTime="triggerGetTime"
          />
          <div
            v-else
            class="previsualition"
          >
            Prévisualisation
          </div>
        </div>
        <div class="column">
          <BaseInput
            v-model.trim="video.title"
            placeholder="Titre"
            type="text"
          />

          <p>Temps</p>

          <div class="controls">
            <div class="columns">
              <div class="column is-half">
                <BaseButton
                  @click.prevent="triggerGetTime(0)"
                >
                  Début
                </BaseButton>
              </div>

              <div class="column is-half">
                <BaseButton
                  @click.prevent="triggerGetTime(1)"
                >
                  Fin
                </BaseButton>
              </div>
            </div>

            <div class="columns">
              <div class="column is-one-third">
                <span>Début <b>{{ startTimeFront }}</b></span>
              </div>
              <div class="column is-one-third">
                <span>Fin <b>{{ endTimeFront }}</b></span>
              </div>
              <div class="column is-one-third">
                <span>Durée <b>{{ durationFront }}</b></span>
              </div>
            </div>
          </div>

          <textarea
            class="textarea"
            placeholder="Ajouter des tags séparés par un espace"
          />

          <BaseButton
            class="is-primary"
            type="submit"
          >
            Publier la vidéo
          </BaseButton>

          <BaseButton
            disabled
            type="submit"
          >
            Télécharger
          </BaseButton>
        </div>
      </div>
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
      startTimeFront: 0,
      endTimeFront: 0,
      durationFront: 0,
    };
  },
  methods: {
    triggerGetTime(option) {
      this.$refs.youtubePlayer.getTime(option);
    },
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
        url: '',
        startTime: '',
        duration: '',
      };
    },
  },
};
</script>

<style scoped>
.title {
  margin-top: 80px;
}

.previsualition {
  border: 1px solid #B0B0B0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-height: 340px;
  color: #B0B0B0;
  font-size: 24px;
}

.controls {
  background: white;
  margin-bottom: 30px;
}

p {
  margin-bottom: 20px;
  margin-top: -10px;
  color: #B0B0B0;
}

b {
  font-size: 24px;
  line-height: 28px;
  margin-left: 20px;
}

.is-one-third {
  text-align: center;
}

.button {
  margin-bottom: 10px;
}

.textarea {
  margin-bottom: 20px;
  border: none;
}

.column {
  padding-top: 0;
}

textarea::placeholder {
  color: #B0B0B0;
  font-size: 16px;
  line-height: 19px;
}
</style>
