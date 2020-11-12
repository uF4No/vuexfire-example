<template>
  <div id="app">
    <h1>My Book List app</h1>
    <form ref="form" class="form-wrapper" @submit.prevent>
      <h2>Add another book</h2>
      <div class="form-row">
        <input type="text" name="title" v-model="title" placeholder="title" />
      </div>
      <div class="form-row">
        <input
          type="text"
          name="author"
          v-model="author"
          placeholder="author"
        />
      </div>
      <div class="form-row">
        <textarea
          name=""
          v-model="summary"
          cols="30"
          rows="3"
          placeholder="book summary"
        ></textarea>
      </div>
      <button class="btn-blue" @click.once="addBook">Save Book</button>
    </form>
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
  methods: {
    addBook() {
      if (this.validateForm) {
        console.log('Form ok!')
        this.$store
          .dispatch('addBook', {
            newBook: {
              author: this.author,
              title: this.title,
              summary: this.summary,
            },
          })
          .then(() => {
            this.resetForm()
          })
      }
    },
    deleteBook(id) {
      this.$store.dispatch('deleteBook', { bookId: id })
    },
    resetForm() {
      this.summary = ''
      this.title = ''
      this.author = ''
    },
    validateForm() {
      if (this.title == '') return false
      if (this.author == '') return false
      if (this.summary == '') return false
      return true
    },
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
.form-wrapper {
  width: 50%;
  min-width: 300px;
  margin: 0 auto;
  border: 1px solid lightslategray;
  border-radius: 10px;
  padding: 2rem;
}
.form-row {
  display: flex;
  justify-content: center;
  padding: 0.5em;
}
input,
textarea {
  font-size: 1rem;
  width: 100%;
  padding: 0.4rem;
  /* border-radius: 5px; */
}
.btn-blue {
  background: cornflowerblue;
  padding: 0.6rem 1.4rem;
  border: 0;
  color: white;
  border-radius: 5px;
  font-size: 1.1rem;
}
.btn-red {
  background: red;
  padding: 0.4rem 0.8rem;
  border: 0;
  color: white;
  border-radius: 5px;
  font-size: 1.1rem;
  margin: 0.5rem;
}
.books-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.book {
  width: 32%;
  margin: 2rem;
  border-bottom: 1px solid gray;
  width: 200px;
  padding: 2rem;
}
</style>
