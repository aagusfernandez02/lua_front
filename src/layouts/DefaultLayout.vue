<script setup>
import { ref } from 'vue';
import AppBar from '@/components/AppBar.vue';
import SideMenu from '@/components/SideMenu.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';

const openedMenu = ref(false);
const openedCart = ref(false);

const switchMenu = (value) => {
  openedMenu.value = value;
}
const switchCart = (value) => {
  openedCart.value = value;
}
</script>

<template>
    <div>
        <SideMenu :openedMenu="openedMenu" @switchMenu="switchMenu" />
        <ShoppingCart :openedCart="openedCart" @switchCart="switchCart"/>
        
        <AppBar @switchMenu="switchMenu" @switchCart="switchCart"/>
    
        <main>
          <RouterView /> <!-- Aquí se renderizan las páginas específicas -->
        </main>
      </div>
</template>

<style scoped>
</style>