<script setup>
</script>

<template>
    <v-app>
        <v-app-bar :elevation="0">
            <template v-slot:prepend>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </template>
          
            <v-app-bar-title>Lua clothes</v-app-bar-title>
          </v-app-bar>
    
        <v-main>
          <router-view /> <!-- Aquí se renderizan las páginas específicas -->
        </v-main>
    
        <v-footer app>
          <span>© 2024 Mi App</span>
        </v-footer>
      </v-app>
</template>

<style scoped>
</style>