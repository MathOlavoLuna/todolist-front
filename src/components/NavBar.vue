<template>
  <nav class="d-flex align-center justify-space-around py-3">
    <RouterLink to="/">Home</RouterLink>
    <img
      width="64"
      height="64"
      src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-to-do-list-productivity-flaticons-lineal-color-flat-icons.png"
      alt="external-to-do-list-productivity-flaticons-lineal-color-flat-icons"
    />
    <RouterLink to="/login" />
  </nav>
</template>

<style scoped>
nav {
  height: 100%;
}

nav > a {
  text-decoration: none;
}
</style>
