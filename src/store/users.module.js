import Vue from 'vue'
import TestService from '@/services/TestService'
import { FETCH_USERS, USERS_RESET_STATE } from './actions.type'
import { RESET_STATE, SET_USERS } from './mutations.type'

const initialState = {
  users: []
}

export const state = { ...initialState }

export const actions = {
  async [FETCH_USERS] (context, prevUsers) {
    if (prevUsers !== undefined) {
      return context.commit(SET_USERS, prevUsers)
    }
    const { data } = await TestService.fetchUsers()

    context.commit(SET_USERS, data)

    return data
  },
  [USERS_RESET_STATE] ({ commit }) {
    commit(RESET_STATE)
  }
}

export const mutations = {
  [SET_USERS] (state, users) {
    state.users = users
  },
  [RESET_STATE] () {
    for (const key in state) {
      Vue.set(state, key, initialState[key])
    }
  }
}

const getters = {
  users (state) {
    return state.users
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
