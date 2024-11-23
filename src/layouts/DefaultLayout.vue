<script setup>
import { ref } from 'vue';
import AppBar from '@/components/AppBar.vue';
import SideMenu from '@/components/SideMenu.vue';

const openedMenu = ref(false);
const switchMenu = (value) => {
  openedMenu.value = value;
}
</script>

<template>
    <div>
        <SideMenu :openedMenu="openedMenu" @switchMenu="switchMenu" />
        <AppBar @switchMenu="switchMenu" />
    
        <main>
          <RouterView /> <!-- Aquí se renderizan las páginas específicas -->
        </main>
      </div>
</template>

<style scoped>
</style>