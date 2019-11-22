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

<style lang="scss" scoped>
$btn-color: #6913FE;

.button {
  width: 100%;
  border-color: $btn-color;
  color: $btn-color;
  border-radius: 0;
  border-width: 2px;
  min-height: 60px;
  font-size: 24px;
  line-height: 28px;
}

.is-primary {
  color: white;
  border: none;
  background: $btn-color;
}

.is-primary:hover {
  background: $btn-color;
}

.is-primary:disabled {
  background: rgba(105, 19, 254, 0.5);
}
</style>
