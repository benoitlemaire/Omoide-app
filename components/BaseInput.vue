<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      :value="value"
      v-bind="$attrs"
      class="input"
      @input="updateValue"
      v-on="listeners"
    >
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
  },
  methods: {
    updateValue(video) {
      this.$emit('input', video.target.value);
    },
  },
};
</script>

<style scoped>
.input {
  margin-bottom: 30px;
  height: 60px;
  font-size: 24px;
  line-height: 28px;
  border: none;
  border-radius: 0;
}

</style>
