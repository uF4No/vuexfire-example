<template>
  <div>
    <div class="books-wrapper">
      <div class="book" v-for="book in allBooks" :key="book.id">
        <h2>{{ book.title }}</h2>
        <p class="subtitle">Written by {{ book.author }}</p>
        <p>{{ book.summary }}</p>

        <button class="btn-red" @click.once="deleteBook(book.id)">
          Delete book
        </button>
        <p class="subtitle"><strong>ID</strong> {{ book.id }}</p>
        <p class="subtitle">
          <strong>Created</strong> {{ book.created.toDate() }}
        </p>
      </div>
    </div>
    <button
      class="btn-blue mt"
      v-if="moreBooks"
      @submit.prevent
      @click="loadMore"
    >
      Load more
    </button>
    <p v-else class="mt">⚠️ There are no more books to load 📚</p>
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
    this.$store.commit('RESET_ALL')
    this.$store.dispatch('getBooksBatch', { limit: 3 })
  },
  computed: {
    ...mapGetters(['allBooks', 'moreBooks']),
  },
  methods: {
    loadMore() {
      this.$store.dispatch('getBooksBatch', { limit: 3 })
    },
  },
}
</script>
