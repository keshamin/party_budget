<template>
  <header>
    <nav>
      <ul>
        <li><h1 class="title">Здесь будет название</h1></li>
      </ul>
    </nav>
  </header>
</template>

<script>

  export default {
    name: "AppHeader",
  }
</script>

<style scoped>
header {
  background: lightgreen;
}

nav > ul {
  display: flex;
}
</style>