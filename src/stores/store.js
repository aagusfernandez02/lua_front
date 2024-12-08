import { defineStore } from "pinia";

export const useStore = defineStore('store', {
    state: () => ({
        shoppingCartProducts: {
            products: [], // Inicializar como array
            total: 0,     // Inicializar total en 0
            count: 0,     // Inicializar count en 0
        },
       /*
        {
            products: [<Object>],
            total: <decimal>,
            count: <int>.
        }
       */
    }),
    actions: {
        addProduct(product){
            const existingProduct = this.shoppingCartProducts.products.find((p) => p.nombre === product.nombre && p.talle === product.talle && p.color === product.color);

            // Si ya existe el producto, acumulo. Si no, lo agrego
            if (existingProduct) {
                existingProduct.qty += product.qty;
            } else {
                this.shoppingCartProducts.products.push(product);
            }

            this.shoppingCartProducts.count += product.qty;
            this.shoppingCartProducts.total += product.precioUnidad * product.qty;
        },
        getTotal(){
            this.shoppingCartProducts.reduce((sum, product) => {
                return sum + (product.precioUnidad * product.qty);
            }, 0);
        },
        addQty(uuid, qty) {
            const productIndex = this.shoppingCartProducts.products.findIndex(p => p.uuid === uuid);

            if (productIndex === -1) {
                console.error('store.js > addQty > Producto no encontrado en el carrito');
                return;
            }

            const product = this.shoppingCartProducts.products[productIndex];
            product.qty += qty;

            this.shoppingCartProducts.count += qty;
            this.shoppingCartProducts.total += qty * product.precioUnidad;
        },
        removeQty(uuid, qty) {
            const productIndex = this.shoppingCartProducts.products.findIndex(p => p.uuid === uuid);

            if (productIndex === -1) {
                console.error('store.js > removeQty > Producto no encontrado en el carrito');
                return;
            }

            const product = this.shoppingCartProducts.products[productIndex];
            product.qty -= qty;

            this.shoppingCartProducts.count -= qty;
            this.shoppingCartProducts.total -= qty * product.precioUnidad;
        },
        removeProduct(uuid) {
            const productIndex = this.shoppingCartProducts.products.findIndex(p => p.uuid === uuid);

            if (productIndex === -1) {
                console.warn('store.js > removeProduct > Producto no encontrado en el carrito');
                return;
            }

            const product = this.shoppingCartProducts.products[productIndex];

            this.shoppingCartProducts.count -= product.qty;
            this.shoppingCartProducts.total -= product.precioUnidad * product.qty;

            this.shoppingCartProducts.products.splice(productIndex, 1);
        },
    },
    persist: true,
});