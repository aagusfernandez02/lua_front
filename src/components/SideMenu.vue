<script setup>
const props = defineProps({
    openedMenu: Boolean,
});

const emits = defineEmits(['switchMenu']);
</script>

<template>
    <div :class="['overlay', props.openedMenu ? 'shown' : 'hidden']" @click="emits('switchMenu', false)"></div>
    <div :class="['menu', props.openedMenu ? 'openedMenu' : 'closedMenu']">
        <!-- Items menu -->
        <div class="listItem">DESTACADOS</div>
        <div class="listItem">NUESTROS PRODUCTOS</div>
        
        <!-- Close icon -->
        <button @click="emits('switchMenu', false)"><i class="mdi mdi-close closeIcon"></i></button>
    </div>
</template>

<style scoped lang="scss">
.overlay {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .85);
    z-index: 3;

    &.shown {
        display: block;
    }
    &.hidden {
        display: none;
    }
}
.menu {
    z-index: 4;
    transition: .5s;

    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: $primary-color-contrast;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding-top: 3rem;


    .listItem {
        width: 95%;
        font-size: 1.5rem;
        font-weight: bold;
        padding: 1rem .5rem;
        border-bottom: 1px solid $primary-color;

        &:first-child {
            border-top: 1px solid $primary-color;
        }
    }

    .closeIcon {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 1rem;
    }


    &.openedMenu {
        transform: translateX(0);
    }
    &.closedMenu {
        transform: translateX(-100%);
    }
}

// Pantallas pequeñas-medianas
@media (min-width: 768px) {
    .menu {
        width: 60vw;
    }
}

// Pantallas medianas-grandes
@media (min-width: 1024px) {
    .menu {
        width: 40vw;
    }
}
</style>