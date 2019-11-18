<template>
  <button
    v-bind="$attrs"
    :class="buttonClass"
    class="button"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    buttonClass: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.button {
  width: 100%;
  border-color: #6913FE;
  color: #6913FE;
  border-radius: 0;
  border-width: 2px;
  min-height: 60px;
  font-size: 24px;
  line-height: 28px;
}

.is-primary {
  color: white;
  background: rgba(105, 19, 254, 0.5);
  border: none;
}

.is-primary:hover {
  background: rgba(105, 19, 254, 0.5);
}
</style>
