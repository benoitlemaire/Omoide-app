<template>
  <div class="container">
    <div class="container-medium">
      <h1 class="title has-text-centered">
        Ajouter une vidéo
      </h1>
      <form @submit.prevent="createVideo">
        <BaseInput
          v-model.trim="youtubeUrlFront"
          placeholder="Lien de la vidéo Youtube"
          type="text"
          @blur="$v.youtubeUrlFront.$touch()"
        />

        <template v-if="$v.youtubeUrlFront.$error">
          <p
            v-if="!$v.youtubeUrlFront.required"
            class="help is-danger"
          >
            Une url Youtube est requise
          </p>
          <p
            v-if="!$v.youtubeUrlFront.isValidUrl"
            class="help is-danger"
          >
            L'url n'est pas valide
          </p>
        </template>

        <div class="columns">
          <div class="column is-three-fifths">
            <div v-if="youtubeUrlFront && !$v.youtubeUrlFront.$error">
              <Preview
                ref="youtubePlayer"
                :video-id="getYoutubeID(youtubeUrlFront)"
                @addStartTime="addStartTime"
                @addEndTime="addEndTime"
                @getDurationTime="getDurationTime"
                @triggerGetTime="triggerGetTime"
              />
            </div>

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
              :disabled="$v.youtubeUrlFront.$invalid"
              @blur="$v.video.title.$touch()"
            />

            <template v-if="$v.video.title.$error">
              <p
                v-if="!$v.video.title.required"
                class="help is-danger"
              >
                Le titre est requis
              </p>

              <p
                v-if="!$v.video.title.maxLength"
                class="help is-danger"
              >
                Le titre doit contenir moins de 60 caractères
              </p>
            </template>

            <p>Temps</p>

            <div class="controls">
              <div class="columns">
                <div class="column is-half">
                  <BaseButton
                    :disabled="$v.video.title.$invalid"
                    @click.prevent="triggerGetTime(0)"
                  >
                    Début
                  </BaseButton>
                </div>

                <div class="column is-half">
                  <BaseButton
                    :disabled="!video.title"
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
              <template v-if="video.duration">
                <p
                  v-if="!$v.video.duration.required"
                  class="help is-danger"
                >
                  Une durée est requise
                </p>
                <p
                  v-if="!$v.video.duration.maxValue"
                  class="help is-danger"
                >
                  La durée ne peut pas être supérieur à 10 minutes
                </p>
              </template>
            </div>

            <textarea
              class="textarea"
              placeholder="Ajouter des tags séparés par un espace"
            />

            <BaseButton
              class="is-primary"
              type="submit"
              :disabled="$v.$anyError"
            >
              Publier la vidéo
            </BaseButton>
          </div>
        </div>
      </form>


      <article
        v-if="backendError"
        class="message is-danger"
      >
        <div class="message-body">
          Il y a eu une erreur avec le serveur. Réessayez plus tard.
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import 'moment-duration-format';
import { required, maxValue, maxLength } from 'vuelidate/lib/validators';

const isValidUrl = (value) => (!!value.includes('https://www.youtube.com/watch?v='));

export default {
  components: {
    BaseInput: () => import('@/components/BaseInput.vue'),
    BaseButton: () => import('@/components/BaseButton.vue'),
    Preview: () => import('@/components/Preview.vue'),
  },
  data() {
    return {
      video: this.createFreshVideoObject(),
      youtubeUrlFront: '',
      startTimeFront: 0,
      endTimeFront: 0,
      durationFront: 0,
      backendError: false,
    };
  },
  validations: {
    youtubeUrlFront: {
      required,
      isValidUrl,
    },
    video: {

      title: {
        required,
        maxLength: maxLength(60),
      },
      duration: {
        required,
        maxValue: maxValue(600),
      },
    },
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
        [ID] = newUrl;
      }

      return ID;
    },
    createVideo() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$nuxt.$loading.start();
        this.video.url = this.getYoutubeID(this.youtubeUrlFront);

        this.$store
          .dispatch('videos/createVideo', this.video)
          .then(() => {
            this.$nuxt.$loading.finish();
            this.$router.push({
              name: 'index',
            });
            this.$store.dispatch('videos/resetInfiniteScroll');
          }).catch(() => {
            this.backendError = true;
          });
      }
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
.container-medium {
  max-width: 1110px;
  margin: 0 auto;
}

.title {
  padding-top: 80px;
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

.input {
  margin-bottom: 30px;
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
