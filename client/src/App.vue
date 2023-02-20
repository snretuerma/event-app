<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      app
    >
      <v-list-item class="px-2 py-1">
        <v-list-item-avatar>
          <v-icon
            class="pink lighten-1"
            dark
          >
            mdi-calendar-heart
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-title>
          <span id="app_title" class="text-overline font-weight-bold">Events App</span>
        </v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in menu"
          :key="item.title"
          :to="item.path"
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: null,
    mini: false,
    menu: [
      { title: 'Events', path: '/', icon: 'mdi-calendar'},
      { title: 'Calendar View', path: '/calendar', icon: 'mdi-calendar-expand-horizontal-outline'},
      { title: 'Users', path: '/users', icon: 'mdi-calendar-account'}
    ]
  }),
};
</script>

<style>
#app_title {
  font-size: 1em !important;
}
</style>