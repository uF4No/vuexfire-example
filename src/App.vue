<template>
  <div id="app">
    <h1>My Book List app</h1>
    <div id="nav">
      <router-link to="/">Basic binding</router-link> |
      <router-link to="/load-more">Load more Pagination</router-link> |
      <router-link to="/pagination">Next-Prev. Pagination</router-link>
    </div>
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
    <router-view />
  </div>
</template>

<script>
export default {
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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
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
.subtitle {
  font-size: 0.8rem;
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
  justify-content: center;
}
.book {
  /* shorhand for  */
  flex: 1 1 30%; /*grow | shrink | basis */
  border-bottom: 1px solid gray;
  padding: 1rem;
}
.mt {
  margin-top: 1rem;
}
</style>
