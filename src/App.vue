<template>
  <div id="app">
    <h1>My Book List app</h1>
    <div class="todo" v-for="book in allBooks" :key="book.id">
      <h2>{{ book.title }}</h2>
      <p>Written by {{ book.author }}</p>
      <p>{{ book.summary }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('bindBooks')
  },
  computed: {
    ...mapGetters(['allBooks']),
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.todo {
  margin: 2rem;
  border-bottom: 1px solid gray;
}
</style>
