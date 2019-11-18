<template>
  <div>
    <button
      v-bind="$attrs"
      :class="buttonClass"
      class="button"
      v-on="$listeners"
    >
      <slot />
    </button>
  </div>
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

<style scoped></style>
