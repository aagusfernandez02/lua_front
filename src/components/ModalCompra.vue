<script setup>
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { useStore } from '@/stores/store';
import { toast } from 'vue3-toastify';

const store = useStore();

// Props and emits
const props = defineProps({
    product: Object,
});
const emits = defineEmits(['close']);


// Refs
const modalShown = ref(false);
const selectedProduct = ref(null);
const selectedQuantity = ref(1);
const selectedTalle = ref(null);
const selectedColor = ref(null);


// Functions
const closeModal = () => {
    modalShown.value = false;
    setTimeout(() => {
        emits('close');
    }, 500 / 2);
};

const increaseQty = () => {
    selectedQuantity.value++;
};

const decreaseQty = () => {
    selectedQuantity.value--;
    
};

const selectTalle = (talle) => {
    if( !selectedProduct.value.talles_disponibles.includes(talle) ) return;
    selectedTalle.value = talle;
};

const selectColor = (color) => {
    if( !selectedProduct.value.colores_disponibles.includes(color) ) return;
    selectedColor.value = color;
};

const confirmOrder = () => {
    if( selectedTalle.value==null || selectedColor.value==null ) {
        toast.warn('Seleccione un talle y color para continuar', {autoClose: 2000, theme: 'dark', position: 'top-center', hideProgressBar: true});
        return;
    }

    const productToAdd = {
        nombre: selectedProduct.value.nombre,
        talle: selectedTalle.value,
        color: selectedColor.value,
        precioUnidad: selectedProduct.value.precio,
        qty: selectedQuantity.value,
        img: selectedProduct.value.img_portrait[0],
    };
    store.addProduct(productToAdd);
    emits('close');
};


// Lifecycle hooks
onBeforeMount(() => {
    selectedProduct.value = props.product;
    console.log(selectedProduct.value)
});
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
        <h2 class="nombre">{{ selectedProduct.nombre }}</h2>
        <p class="precio">$ {{ selectedProduct.precio }}</p>
        <div class="optionsContainer">
            <p>Talles:</p>
            <ul>
                <li
                    v-for="talle in selectedProduct.talles" 
                    :key="talle"
                    :class="{faltante: !selectedProduct.talles_disponibles.includes(talle), selected: selectedTalle === talle}"
                    @click="selectTalle(talle)"
                >{{ talle }}</li>
            </ul>
        </div>
        <div class="optionsContainer">
            <p>Colores:</p>
            <ul>
                <li
                    v-for="color in selectedProduct.colores"
                    :key="color"
                    :class="{ faltante: !selectedProduct.colores_disponibles.includes(color), selected: selectedColor === color }"
                    @click="selectColor(color)"
                >{{ color }}</li>
            </ul>
        </div>
        <div class="actionsContainer">
            <div class="qtyControl">
                <button @click="decreaseQty" :disabled="selectedQuantity <= 1"><i class="mdi mdi-minus-box"></i></button>
                <p class="qty">{{ selectedQuantity }}</p>
                <button @click="increaseQty"><i class="mdi mdi-plus-box"></i></button>
            </div>
            <button class="addButton" @click="confirmOrder">Agregar al carrito</button>
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
                &:disabled{
                    opacity: 0.5;
                }
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

    li {
        &.faltante {
            opacity: 0.3;
        }
        &.selected {
            background-color: $primary-color;
            color: $primary-color-contrast;
            transform: scale(1.1);
        }
        &:hover {
            cursor: pointer;
        }
    }

    &.hidden {
        bottom: -100%;
    }

    &.shown {
        bottom: 0;
    }
}

// Pantallas medianas-grandes
@media (min-width: 1024px) {

    .modalContainer {
        width: 50%;
        left: 50%;
        transform: translateX(-50%);

        &.hidden {
            bottom: -100%;
        }

        &.shown {
            bottom: 50%;
            transform: translate(-50%, 50%);
        }
    }
}
</style>