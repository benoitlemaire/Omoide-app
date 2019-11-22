<template>
  <div class="container">
    <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <nuxt-link to="/">
          Omoide
        </nuxt-link>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
      >
        <div class="navbar-end">
          <div class="navbar-item">
            <nuxt-link
              to="/addVideo"
            >
              Ajouter une vidéo
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.navbar-brand {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
