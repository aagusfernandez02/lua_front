<script setup>
const emits = defineEmits(['switchMenu']);
</script>

<template>
    <div class="appbar">
        <button @click="emits('switchMenu', true)"><i class="mdi mdi-menu menuIcon"></i></button>
        <h1 class="title">LUA STREET</h1>
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
    
}
</style>