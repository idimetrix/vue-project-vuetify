import Vue from 'vue'
import Vuex from 'vuex'

import users from './users.module'
import posts from './posts.module'
import comments from './comments.module'
import albums from './albums.module'
import photos from './photos.module'

Vue.use(Vuex)

const initialState = {

}

export const state = { ...initialState }

export const actions = {

}

export const mutations = {

}

const getters = {

}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    users,
    posts,
    comments,
    albums,
    photos
  }
})
