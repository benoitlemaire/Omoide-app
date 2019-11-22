<template>
  <div>
    <NavBar />
    <nuxt />
  </div>
</template>

<script>
export default {
  components: {
    NavBar: () => import('@/components/NavBar.vue'),
  },
};
</script>

<style lang="scss">
html {
  font-family: 'Rubik', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: #F3F3F3;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  max-width: 1440px;
}

.navbar {
  background: none;
}

iframe {
  width: 100%;
  max-width: 708px;
}
</style>
