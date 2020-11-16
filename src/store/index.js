import Vue from 'vue'
import Vuex from 'vuex'

// imports collection reference from firebase.js file
import { booksCollection } from '@/firebase'
// imports required to bind the state to Firebase using Vuexfire
import { firestoreAction, vuexfireMutations } from 'vuexfire'
Vue.use(Vuex)

/**
 * Used for VuexFire Pagination. Returns the documents and its
 * Firestore references in _doc so they can be used in the
 * startAfter method to paginate
 * @param {*} doc
 */
const customSerializer = (doc) => {
  const data = doc.data()
  // adds _doc to be used to paginate
  Object.defineProperty(data, '_doc', { value: doc })
  // adds id as enumerable attribute so we can easily access it
  Object.defineProperty(data, 'id', { value: doc.id, enumerable: true })
  return data
}

export default new Vuex.Store({
  state: {
    allBooks: [],
    booksBatch: [],
    loadMoreLastBook: null,
    moreBooksPending: true,
  },
  mutations: {
    // adds Vuexfire built-in mutations
    ...vuexfireMutations,
    MERGE_BOOKS_BATCH(state, payload) {
      console.log(`Adding ${payload.books.length} to the list`)
      state.allBooks = state.allBooks.concat(payload.books)
    },
    SET_LOADMORE_LAST(state) {
      console.log('Setting last...')
      state.loadMoreLastBook = state.allBooks[state.allBooks.length - 1]._doc
      state.booksBatch = []
    },
    ALL_BOOKS_LOADED(state) {
      state.moreBooksPending = false
    },
    RESET_ALL(state) {
      state.allBooks = []
      state.booksBatch = []
      state.loadMoreLastBook = null
      state.moreBooksPending = true
    },
  },
  actions: {
    /**
     * @param context deconstructed to get only the method to create the ref
     */
    bindBooks: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        'allBooks',
        booksCollection.orderBy('created', 'asc')
      )
    }),
    getBooksBatch: firestoreAction((context, payload) => {
      if (context.state.loadMoreLastBook)
        console.log(
          'Loading Books batch. Last item is',
          context.state.loadMoreLastBook.id
        )
      return context
        .bindFirestoreRef(
          'booksBatch',
          booksCollection
            .orderBy('created', 'asc')
            .limit(payload.limit || 3)
            .startAfter(context.state.loadMoreLastBook || null),
          // IMPORTANT: changes the default document serializer function
          // to get the document reference and id
          { serialize: customSerializer }
        )
        .then((books) => {
          console.log(`Got ${books.length} books`)
          if (books.length > 0) {
            context.commit('MERGE_BOOKS_BATCH', { books })
            context.commit('SET_LOADMORE_LAST')
          }
          // set all loaded if we dont return as many as the limit
          if (books.length < payload.limit) context.commit('ALL_BOOKS_LOADED')
        })
    }),
    addBook: firestoreAction((context, payload) => {
      console.log('Adding a new book!')
      return (
        booksCollection
          // adds created field to use it to sort
          .add({ created: new Date(), ...payload.newBook })
          .then(() => {
            context.commit('RESET_ALL')
            context.dispatch('getBooksBatch', { limit: 3 })
          })
      )
    }),
    deleteBook: firestoreAction((context, payload) => {
      console.log(`Deleting book ${payload.bookId}`)
      return booksCollection
        .doc(payload.bookId)
        .delete()
        .then(() => {
          context.commit('RESET_ALL')
          context.dispatch('getBooksBatch', { limit: 3 })
        })
    }),
  },

  getters: {
    allBooks: (state) => {
      return state.allBooks
    },
    moreBooks: (state) => {
      return state.moreBooksPending
    },
  },
})
