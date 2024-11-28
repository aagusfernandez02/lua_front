<script setup>
import { computed, onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
import products from '@/products.json';

const isMobile = ref(window.innerWidth <= 768);

const destacadosInterval = 5000;


const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener('resize', updateIsMobile);
  console.log(products)
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsMobile);
});

const destacados = computed(() => (isMobile.value ? destacadosMobile : destacadosDesktop));
</script>

<template>
  <main>
    <!-- DESTACAODS -->
    <section>
      <h1 class="sectionTitle mt-5">DESTACADOS</h1>
      <div class="destacadosContainer">
        <v-carousel height="100%" width="100%" :show-arrows="false" hide-delimiter-background cycle
          :interval="destacadosInterval">
          <v-carousel-item v-for="product in products" class="slide">
            <img :src="isMobile ? product.img_mobile : product.img_desktop" :alt="`Imagen ${product.nombre}`" />
          </v-carousel-item>
        </v-carousel>
      </div>
    </section>

    <!-- NUESTROS PRODUCTOS -->
    <section>
      <h1 class="sectionTitle mt-10">NUESTROS PRODUCTOS</h1>

      <div class="nuestrosProductosContainer">
        <div class="card" v-for="product in products">
          <img :src="product.img_mobile" :alt="`Imagen ${product.nombre}`" />
          <h2>{{ product.nombre }}</h2>
          <p>${{ product.precio }}</p>
          <button class="buyButton">COMPRAR</button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  padding-bottom: 10rem; // Sacar, es para darle espaciado en dev

  section {
    width: 100%;

    .sectionTitle {
      font-size: 1.75rem;
      font-family: $secondary-font;
      text-align: center;
    }

    .destacadosContainer {
      height: 70vh;
      width: 100%;
      padding: 1rem;

      .slide {
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

    }

    .nuestrosProductosContainer {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: start;
      flex-wrap: wrap;
      row-gap: 2rem;

      .card {
        width: 40%;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        box-shadow: 0px 15px 15px 0px rgba(0, 0, 0, 0.1);


        img {
          width: 100%;
          height: auto;
          //aspect-ratio: 9/16;
          aspect-ratio: 3/4;
          object-fit: cover;
        }

        h2 {
          font-size: 1rem;
        }

        .buyButton {
          margin-top: 1rem;
          margin-bottom: 0.75rem;
          padding: .25rem .75rem;

          background-color: $primary-color;
          color: $primary-color-contrast;
          border-radius: 5px;
          font-weight: bold;

          font-size: .8rem;

          display: flex;
          justify-content: center;
          align-items: center;
          gap: .5rem;
        }
      }
    }

  }

}

// Pantallas pequeñas-medianas
@media (min-width: 768px) {

  main {
    section {
      .nuestrosProductosContainer {
        .card {
          width: 30%;
        }
      }
    }
  }
}

// Pantallas medianas-grandes
@media (min-width: 1024px) {
  
  main {
    section {
      .nuestrosProductosContainer {
        .card {
          width: 20%;
        }
      }
    }
  }
}
</style>