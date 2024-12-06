<script setup>
import { ref } from 'vue';
import { useStore } from '@/stores/store';

const emits = defineEmits(['switchMenu']);

const store = useStore();

</script>

<template>
    <div class="appbar">
        <button @click="emits('switchMenu', true)"><i class="mdi mdi-menu menuIcon"></i></button>
        <h1 class="title">LUA STREET</h1>
        <button @click="console.log(store.shoppingCartProducts)">
            <!-- <i class="mdi mdi-cart cartIcon"></i> -->
            <v-badge :content="store.shoppingCartProducts.count" color="red">
                <template #badge>
                  <span class="custom-badge">{{ store.shoppingCartProducts.count }}</span>
                </template>
                <v-icon icon="mdi mdi-cart cartIcon" size="large"></v-icon>
              </v-badge>
        </button>
    </div>
</template>

<style scoped lang="scss">
.appbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;

    width: 100%;
    height: $appbar-height;

    padding: .5rem 1rem; 
    background-color: $primary-color;
    

    display: flex;
    align-items: center;
    justify-content: space-between;
    
    color: #fff;

    .title {
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: .5rem;
    }

    .menuIcon {
        font-size: 1.5rem;
    }

    .custom-badge {
        font-weight: bold; 
        font-size: 1rem;   
    }
    
}
</style>