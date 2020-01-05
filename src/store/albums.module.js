import Vue from 'vue'
import TestService from '@/services/TestService'
import { FETCH_ALBUMS, ALBUMS_RESET_STATE } from './actions.type'
import { RESET_STATE, SET_ALBUMS } from './mutations.type'

const initialState = {
  albums: []
}

export const state = { ...initialState }

export const actions = {
  async [FETCH_ALBUMS] (context, prevAlbums) {
    if (prevAlbums !== undefined) {
      return context.commit(SET_ALBUMS, prevAlbums)
    }
    const { data: albums } = await TestService.fetchAlbums()
    const { data: photos } = await TestService.fetchPhotos()
    const { data: users } = await TestService.fetchUsers()

    albums.map(album => {
      album.photos = photos.filter(photo => photo.albumId === album.id)
      album.user = users.find(user => user.id === album.userId)
    })

    context.commit(SET_ALBUMS, albums)

    return albums
  },
  [ALBUMS_RESET_STATE] ({ commit }) {
    commit(RESET_STATE)
  }
}

export const mutations = {
  [SET_ALBUMS] (state, albums) {
    state.albums = albums
  },
  [RESET_STATE] () {
    for (const key in state) {
      Vue.set(state, key, initialState[key])
    }
  }
}

const getters = {
  albums (state) {
    return state.albums
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
