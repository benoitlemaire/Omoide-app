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

      <BaseInput
        v-model.trim="video.startTime"
        label="Start time"
        placeholder="00:02:35"
        type="text"
      />

      <BaseInput
        v-model.trim="video.duration"
        label="Duration"
        placeholder="00:03:10"
        type="text"
      />
      <BaseButton type="submit">Envoyer</BaseButton>
    </form>
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  components: {
    BaseInput,
    BaseButton
  },
  data() {
    return {
      video: this.createFreshVideoObject()
    }
  },

  methods: {
    createVideo() {
      this.$nuxt.$loading.start()
      this.$store
        .dispatch('videos/createVideo', this.video)
        .then(() => {
          this.$nuxt.$loading.finish()
          this.$router.push({
            name: 'index'
          })
        })
        .catch((error) => {
          throw error.message
        })
      this.video = this.createFreshVideoObject()
    },
    createFreshVideoObject() {
      return {
        title: '',
        url: '',
        startTime: '00:02:50',
        duration: '00:00:30'
      }
    }
  }
}
</script>

<style></style>
