<template>
  <v-app id="inspire">
    <PartialSider
      :items="items"
      :drawer.sync="drawer"
    />

    <PartialHeader :drawer.sync="drawer" />

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>

    <PartialFooter />
  </v-app>
</template>

<script>
import PartialHeader from '@/partials/PartialHeader'
import PartialFooter from '@/partials/PartialFooter'
import PartialSider from '@/partials/PartialSider'

export default {
  name: 'App',
  components: {
    PartialHeader,
    PartialFooter,
    PartialSider
  },
  data: () => ({
    drawer: true,
    items: [
      { icon: 'mdi-home', text: 'Home', href: '/' },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Blog',
        model: true,
        children: [
          { icon: 'mdi-database', text: 'Posts', href: '/posts' },
          { icon: 'mdi-account', text: 'Users', href: '/users' },
          { icon: 'mdi-comment', text: 'Comments', href: '/comments' }
        ]
      },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Media',
        model: true,
        children: [
          { icon: 'mdi-image-album', text: 'Albums', href: '/albums' },
          { icon: 'mdi-file-image', text: 'Photos', href: '/photos' }
        ]
      },
      { icon: 'mdi-content-copy', text: 'Page1', href: '/page1' },
      { icon: 'mdi-content-copy', text: 'Page2', href: '/page2' },
      { icon: 'mdi-content-copy', text: 'Page3', href: '/page3' }
    ]
  })
}
</script>

<style lang="scss" scoped>

</style>
