<template>
  <div>
    <button
      v-bind="$attrs"
      :class="buttonClass"
      v-on="$listeners"
      class="button"
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
