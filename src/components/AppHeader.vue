<template>
  <header class="row">
    <img class="logo col-1" src="@/assets/logo.png">
    <h1 class="col title darkgreen-text">Party Budget Tool</h1>
    <button type="button" class="col-2 btn my-outline-btn">Инструкция</button>
    <p class="col-1 self-align-end author-note darkgreen-text">Author: <a href="https://github.com/keshamin">@keshamin</a></p>
  </header>
</template>

<script>

  export default {
    name: "AppHeader",
  }
</script>

<style scoped lang="scss">
@import "styles.scss";

header {
  padding: 5px;
  background: $green_background_color;
}

img.logo {
  max-width: 60px;
  height: auto;
  object-fit: contain;
  padding: 0;
}

.author-note {
  text-align: end;
  vertical-align: middle;
}

.my-outline-btn {
  width: 0px;
  margin: 5px;
}

</style>