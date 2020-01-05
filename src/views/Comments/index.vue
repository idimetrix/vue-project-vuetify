<template>
  <div>
    <Row class="m-b-25">
      <i-Col span="6">
        <Select
          v-model="per_page"
          @on-change="pager"
        >
          <Option
            v-for="item in per_pages"
            :value="item"
            :key="item"
          >
            {{ item }}
          </Option>
        </Select>
      </i-Col>
      <i-Col
        span="6"
        offset="12"
      >
        <i-Input
          v-model="search"
          placeholder="Search..."
          @on-change="searcher"
        />
      </i-Col>
    </Row>

    <Table
      border
      :columns="columns"
      :data="commentsFilterCurrent"
      :loading="loading"
      @on-expand="expander"
    >
      <template
        slot-scope="{ row }"
        slot="id"
      >
        <strong>{{ row.id }}</strong>
      </template>

      <template
        slot-scope="{ row }"
        slot="name"
      >
        {{ row.name }}
      </template>

      <template
        slot-scope="{ row }"
        slot="email"
      >
        {{ row.email }}
      </template>

      <template
        slot-scope="{ row }"
        slot="body"
      >
        {{ row.body }}
      </template>
    </Table>
    <Row class="m-t-25">
      <i-Col span="24">
        <Page
          :total="commentsFilterTotal.length"
          :current="page"
          :page-size="per_page"
          show-total
          prev-text="Previous"
          next-text="Next"
          @on-change="paginate"
        />
      </i-Col>
    </Row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FETCH_COMMENTS } from '@/store/actions.type'

export default {
  name: 'Users',
  data () {
    return {
      expanded: [],
      deleted: [],
      slice: 100,
      search: '',
      searchBy: 'name,email,body',
      order: 'desc',
      orderBy: 'id',
      page: 1,
      per_page: 10,
      per_pages: [5, 10, 15, 25, 50],
      loading: false,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '#',
          slot: 'id',
          key: 'id',
          sortable: true,
          width: 65
        },
        {
          title: 'Name',
          slot: 'name',
          key: 'name',
          sortable: true
        },
        {
          title: 'Email',
          slot: 'email',
          key: 'email',
          sortable: true
        },
        {
          title: 'Body',
          slot: 'body',
          key: 'body',
          sortable: true
        },
        {
          title: 'Actions',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, 'View'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, 'Delete')
            ])
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['comments']),
    commentsFilterTotal () {
      const columns = this.searchBy.split(/\s*,\s*/g)

      return this.comments
        .filter(comment =>
          this.deleted.indexOf(comment.id) === -1
        )
        .filter(comment =>
          columns.filter(column => comment[column].toLowerCase().indexOf(this.search) !== -1).length
        )
    },

    commentsFilterCurrent () {
      return this.commentsFilterTotal.slice(
        (this.page - 1) * this.per_page,
        (this.page - 1) * this.per_page + this.per_page
      )
    }
  },
  methods: {
    sort (column) {
      this.orderBy = column.key
      this.order = column.order
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
    show (index) {
      const { id, name, email, body } = this.commentsFilterCurrent[index]

      this.$Modal.info({
        title: 'Info',
        content: `<b>Id: ${id}</b><br><br><b>Name:</b> ${name}<br><br><b>Email:</b> ${email}<br><br><b>Body:</b> ${body}}`
      })
    },
    remove (index) {
      const { id } = this.commentsFilterCurrent[index]

      this.deleted.push(id)
    }
  },
  mounted () {
    this.$store.dispatch(FETCH_COMMENTS)
  }
}
</script>
