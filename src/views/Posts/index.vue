<template>
  <div class="home">
    <v-card>
      <v-card-title>
        <v-toolbar flat>
          <v-toolbar-title>
            Posts
          </v-toolbar-title>
        </v-toolbar>
        <v-spacer />
        <v-text-field
          v-model="search"
          label="Search"
        />
      </v-card-title>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="postsFilterTotal"
        :search="search"
        :single-expand="true"
        show-expand
      >
        <template v-slot:item.user="{ item }">
          {{ item.user.name }}
        </template>
        <template v-slot:item.body="{ item }">
          {{
            expanded.indexOf(item.id) === -1
              ? item.body.slice(0, slice) + "..."
              : item.body
          }}
          <div v-if="expanded.indexOf(item.id) === -1">
            <a @click="expanded.push(item.id)">read more</a>
          </div>
        </template>
        <template v-slot:item.comments="{ item }">
          {{ item.comments.length }}
        </template>
        <template v-slot:expanded-item="{ item }">
          <RowExpand :row="item" />
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="show(item)"
          >
            show
          </v-icon>
          <v-icon
            small
            @click="remove(item)"
          >
            remove
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FETCH_POSTS } from '@/store/actions.type'
import RowExpand from './RowExpand.vue'

export default {
  name: 'Posts',
  components: {
    RowExpand
  },
  data () {
    return {
      expanded: [],
      deleted: [],
      slice: 100,
      search: '',
      searchBy: 'title,body',
      order: 'desc',
      orderBy: 'id',
      page: 1,
      per_page: 10,
      per_pages: [5, 10, 15, 25, 50],
      loading: false,
      headers: [
        {
          text: '#',
          slot: 'id',
          value: 'id',
          sortable: true,
          width: 65
        },
        {
          text: 'User',
          slot: 'user',
          value: 'user',
          sortable: true,
          width: 200
        },
        {
          text: 'Title',
          slot: 'title',
          value: 'title',
          sortable: true,
          width: 300
        },
        {
          text: 'Body',
          slot: 'body',
          value: 'body',
          sortable: true
        },
        {
          text: 'Comments',
          slot: 'comments',
          value: 'comments',
          sortable: true,
          width: 130
        },
        { text: 'Actions', value: 'action', sortable: false, width: 130 }
      ]
    }
  },
  methods: {
    sort (data) {
      this.orderBy = data.key
      this.order = data.order
    },
    searcher () {
      this.page = 1
    },
    paginate (page) {
      this.page = page
    },
    expander (row, status) {
      const index = this.expanded.indexOf(row.id)

      if (status) {
        index === -1 && this.expanded.push(row.id)
      } else {
        index !== -1 && this.expanded.splice(index, 1)
      }
    },
    pager () {
      this.page = 1
    },
    selectAll () {
      this.$refs.table.selectAll(true)
    },
    deselectAll () {
      this.$refs.table.selectAll(false)
    },
    show (item) {
      const { id, title, body } = item

      this.$Modal.info({
        text: 'Info',
        content: `<b>Id: ${id}</b><br><br><b>Title:</b> ${title}<br><br><b>Body:</b> ${body}}`
      })
    },
    remove (item) {
      const { id } = item

      this.deleted.push(id)
    }
  },
  computed: {
    ...mapGetters({ fetchedPosts: 'posts' }),
    postsFilterTotal () {
      const columns = this.searchBy.split(/\s*,\s*/g)

      return this.fetchedPosts
        .filter(post =>
          this.deleted.indexOf(post.id) === -1
        )
        .filter(post =>
          columns.filter(column => post[column].toLowerCase().indexOf(this.search) !== -1).length
        )
    },

    postsFilterCurrent () {
      return this.postsFilterTotal.slice(
        (this.page - 1) * this.per_page,
        (this.page - 1) * this.per_page + this.per_page
      )
    }
  },
  mounted () {
    this.$store.dispatch(FETCH_POSTS)
  }
}
</script>
