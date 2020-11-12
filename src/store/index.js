import Vue from 'vue'
import Vuex from 'vuex'

// imports collection reference from firebase.js file
import { booksCollection } from '@/firebase'
// imports required to bind the state to Firebase using Vuexfire
import { firestoreAction, vuexfireMutations } from 'vuexfire'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allBooks: [],
  },
  actions: {
    /**
     * @param context deconstructed to get only the method to create the ref
     */
    bindBooks: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        'allBooks',
        booksCollection.orderBy('author', 'asc')
      )
    }),
    addBook: firestoreAction((context, payload) => {
      console.log('Adding a new book!')
      return booksCollection.add(payload.newBook)
    }),
    deleteBook: firestoreAction((context, payload) => {
      console.log(`Deleting book ${payload.bookId}`)
      return booksCollection.doc(payload.bookId).delete()
    }),
  },
  mutations: {
    // adds Vuexfire built-in mutations
    ...vuexfireMutations,
  },
  getters: {
    allBooks: (state) => {
      return state.allBooks
    },
  },
})
