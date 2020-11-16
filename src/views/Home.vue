<template>
  <div class="home">
    <div class="books-wrapper">
      <div class="book" v-for="book in allBooks" :key="book.id">
        <h2>{{ book.title }}</h2>
        <p>Written by {{ book.author }}</p>
        <p>{{ book.summary }}</p>
        <button class="btn-red" @click.once="deleteBook(book.id)">
          Delete book
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      title: '',
      author: '',
      summary: '',
    }
  },
  mounted() {
    this.$store.dispatch('bindBooks')
  },
  computed: {
    ...mapGetters(['allBooks']),
  },
  methods: {},
}
</script>
