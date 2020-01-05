import Api from '@/services/Api'

export default {
  fetchUsers: (params) => Api().get('/users', { params }),
  fetchPosts: (params) => Api().get('/posts', { params }),
  fetchComments: (params) => Api().get('/comments', { params }),
  fetchAlbums: (params) => Api().get('/albums', { params }),
  fetchPhotos: (params) => Api().get('/photos', { params })
}
