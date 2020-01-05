import Vue from 'vue'
import TestService from '@/services/TestService'
import { FETCH_PHOTOS, PHOTOS_RESET_STATE } from './actions.type'
import { RESET_STATE, SET_PHOTOS } from './mutations.type'

const initialState = {
  photos: []
}

export const state = { ...initialState }

export const actions = {
  async [FETCH_PHOTOS] (context, prevPhotos) {
    if (prevPhotos !== undefined) {
      return context.commit(SET_PHOTOS, prevPhotos)
    }
    const { data: photos } = await TestService.fetchPhotos()
    const { data: albums } = await TestService.fetchAlbums()

    photos.map(photo => {
      photo.user = albums.find(user => albums.id === photo.albumId)
    })

    context.commit(SET_PHOTOS, photos)

    return photos
  },
  [PHOTOS_RESET_STATE] ({ commit }) {
    commit(RESET_STATE)
  }
}

export const mutations = {
  [SET_PHOTOS] (state, photos) {
    state.photos = photos
  },
  [RESET_STATE] () {
    for (const key in state) {
      Vue.set(state, key, initialState[key])
    }
  }
}

const getters = {
  photos (state) {
    return state.photos
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
