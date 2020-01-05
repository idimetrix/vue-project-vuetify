import Vue from 'vue'
import TestService from '@/services/TestService'
import { FETCH_COMMENTS, COMMENTS_RESET_STATE } from './actions.type'
import { RESET_STATE, SET_COMMENTS } from './mutations.type'

const initialState = {
  comments: []
}

export const state = { ...initialState }

export const actions = {
  async [FETCH_COMMENTS] (context, prevComments) {
    if (prevComments !== undefined) {
      return context.commit(SET_COMMENTS, prevComments)
    }
    const { data: comments } = await TestService.fetchComments()
    const { data: posts } = await TestService.fetchPosts()

    comments.map(comment => {
      comment.post = posts.find(post => post.id === comment.postId)
    })

    context.commit(SET_COMMENTS, comments)

    return comments
  },
  [COMMENTS_RESET_STATE] ({ commit }) {
    commit(RESET_STATE)
  }
}

export const mutations = {
  [SET_COMMENTS] (state, comments) {
    state.comments = comments
  },
  [RESET_STATE] () {
    for (const key in state) {
      Vue.set(state, key, initialState[key])
    }
  }
}

const getters = {
  comments (state) {
    return state.comments
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
