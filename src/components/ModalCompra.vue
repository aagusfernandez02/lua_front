<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

// Props and emits
const props = defineProps({
    product: Object,
});
const emits = defineEmits(['close']);


// Refs
const modalShown = ref(false);
const qty = ref(1);


// Functions
const closeModal = () => {
    modalShown.value = false;
    setTimeout(() => {
        emits('close');
    }, 500/2);
};

const increaseQty = () => {
    qty.value++;
};  

const decreaseQty = () => {
    if (qty.value > 1) {
        qty.value--;
    }
};

// Lifecycle hooks
onMounted(() => {
    setTimeout(() => {
        modalShown.value = true;
    }, 1);
});
onUnmounted(() => {
    modalShown.value = false;
});
</script>

<template>
    <div class="overlay" @click="closeModal"></div>
    <div :class="['modalContainer', modalShown ? 'shown' : 'hidden']">
        <i class="mdi mdi-close closeButton" @click="closeModal"></i>
        <h2 class="nombre">{{ props.product.nombre }}</h2>
        <p class="precio">$ {{ props.product.precio }}</p>
        <div class="optionsContainer">
            <p>Talles:</p>
            <ul>
                <li v-for="talle in props.product.talles">{{ talle }}</li>
            </ul>
        </div>
        <div class="optionsContainer">
            <p>Colores:</p>
            <ul>
                <li v-for="color in props.product.colores">{{ color }}</li>
            </ul>
        </div>
        <div class="actionsContainer">
            <div class="qtyControl">
                <button @click="decreaseQty"><i class="mdi mdi-minus-box"></i></button> 
                <p class="qty">{{ qty }}</p>
                <button @click="increaseQty"><i class="mdi mdi-plus-box"></i></button>
            </div>
            <button class="addButton">Agregar al carrito</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba($color: #000000, $alpha: 0.8);
    width: 100%;
    height: 100%;
    z-index: 3;
}
.modalContainer {
    transition: 0.5s;

    position: fixed;
    left: 0;

    background-color: $primary-color-contrast;
    width: 100%;
    //max-height: 40%;
    z-index: 3;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    padding: 1rem;
    gap: .5rem;

    .closeButton {
        position: absolute;
        right: 1rem;
        top: .5rem;
        font-size: 1.5rem;
    }

    .nombre {
        font-size: 1.25rem;
        font-weight: bold;
    }

    .precio {
        font-size: 1.25rem;
        font-weight: lighter;
    }

    .optionsContainer {
        display: flex;
        flex-direction: column;

        ul {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: .5rem;
            
            li {
                list-style: none;
                font-size: 1rem;
                padding: .25rem .5rem;
                border: 1px solid $primary-color;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

    .actionsContainer {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 1.5rem;
        width: 100%;

        .qtyControl {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30%;

            .qty {
                font-size: 1.5rem;  
                width: 30%;
                text-align: center;              
            }
            button {
                font-size: 2rem;
            }
        }

        .addButton {
            width: 50%;
            font-size: 1rem;
            background-color: #000;
            color: #fff;
            border-radius: 5px;
            padding-top: .5rem;
            padding-bottom: .5rem;
        }
    }

    &.hidden {
        bottom: -100%;
    }
    &.shown {
        bottom: 0;
    }
}
</style>