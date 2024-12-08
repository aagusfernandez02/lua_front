<script setup>
import { useStore } from '@/stores/store';

// Props and emits
const props = defineProps({
    openedCart: Boolean,
});

const emits = defineEmits(['switchCart']);

// Refs
const store = useStore();

// Functions
const increaseQuantity = (product) => {
    store.addQty(product.uuid, 1);
};

const removeQuantity = (product) => {
    store.removeQty(product.uuid, 1);
};

const removeProduct = (product) => {
    store.removeProduct(product.uuid);
};

const sendWhatsAppMessage = () => {
    const phoneNumber = import.meta.env.VITE_WP_PHONE_NUMBER;
    const products = store.shoppingCartProducts.products;
    const message = products
        .map(
            (product) =>
                `- ${product.nombre}, ${product.color}. Talle: ${product.talle} - x ${product.qty}`   
        )
        .join('\n');
    const totalMessage = `Hola Lua, quiero finalizar la compra de mi pedido con los siguientes productos:\n${message}`;
    const encodedMessage = encodeURIComponent(totalMessage); // Escapa caracteres especiales
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank'); // Abre WhatsApp Web en una nueva pestaña
};
</script>

<template>
    <div :class="['overlay', props.openedCart ? 'shown' : 'hidden']" @click="emits('switchCart', false)"></div>
    <div :class="['cart', props.openedCart ? 'openedCart' : 'closedCart']">
        <h2>Orden de compra</h2>
        <ul>
            <li v-for="product in store.shoppingCartProducts.products" class="productRow">
                <img :src="product.img" :alt="`Imagen de ${product.nombre}`">
                <div class="productData">
                    <p class="productName">{{ product.nombre }}</p>
                    <div class="productDescription">
                        <div><p>{{ product.color }}</p></div>
                        <div><p>{{ product.talle }}</p></div>
                        <div><p>${{ product.precioUnidad }}</p></div> 
                    </div>
                </div>
                <div class="qtyControl">
                    <button @click="removeProduct(product)"><i class="mdi mdi-delete deleteIcon mr-2"></i></button>
                    <button @click="removeQuantity(product)" :disabled="product.qty <= 1"><i class="mdi mdi-minus-box"></i></button>
                    <p class="qty">{{ product.qty }}</p>
                    <button @click="increaseQuantity(product)"><i class="mdi mdi-plus-box"></i></button>
                </div>
                <div class="totalRow">
                    <div><p>${{ product.precioUnidad  * product.qty }}</p></div>
                </div>
                <!-- {{ `${product.nombre} (Talle: ${product.talle} - Color: ${product.color}) | x${product.qty} | $${product.precioUnidad}x${product.qty} ==> $${product.precioUnidad*product.qty}` }} -->
            </li>
        </ul>
        <h5 class="totalPrice">Total: $ {{ store.shoppingCartProducts.total }}</h5>
        <button class="buyButton" @click="sendWhatsAppMessage">Finalizar compra</button>
        <!-- Close icon -->
        <button @click="emits('switchCart', false)"><i class="mdi mdi-close closeIcon"></i></button>
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
.cart {
    z-index: 4;
    transition: .5s;

    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    background-color: $primary-color-contrast;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding-top: 2rem;

    ul {
        width: 100%;

        .productRow {
            position: relative;
            width: 100%;
            list-style: none;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 1rem .5rem; 
            border-bottom: 1px solid rgba($color: #000000, $alpha: 0.25);    
    
            img {
                width: 75px;
                height: 75px;
                object-fit: cover;
            }
           
            .productData {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: start;
                width: 30%;

                .productName {
                    font-size: 1rem;
                    font-weight: bold;
                    width: 100%;
                    text-align: center;
                }

                .productDescription {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    font-size: .9rem;

                    .productDescription_data {
                        width: 50%;
                        text-align: center;
                    }
                }
            }
            .qtyControl {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 20%;
    
                .qty {
                    width: 30%;
                    text-align: center;
                    font-size: 1.5rem;
                }
                
                button {
                    font-size: 1.5rem;
                    &:disabled{
                        opacity: 0.25;
                    }
                }

                .deleteIcon {
                    color: $cancel-color;
                }
            }
        } 
        
    }
        .totalPrice {
            width: 100%;
            padding: .26rem auto; 
            text-align: center;
            font-size: 1.5rem;
            margin-top: 1rem;
        }
        .buyButton {
            padding: .5rem 1.5rem;  
            text-align: center;
            font-size: 1.5rem;
            margin-top: 1rem;
            background-color: $primary-color;
            color: $primary-color-contrast;
            border-radius: 5px;
        }

    .closeIcon {
        position: absolute;
        top: 1rem;
        left: 1rem;
        font-size: 1rem;
    }


    &.openedCart {
        transform: translateX(0%);
    }
    &.closedCart {
        transform: translateX(100%);
    }
}

// Pantallas pequeñas-medianas
@media (min-width: 768px) {
    .cart {
        width: 60vw;
    }
}

// Pantallas medianas-grandes
@media (min-width: 1024px) {
    .cart {
        width: 40vw;
    }
}
</style>