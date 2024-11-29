<script setup>
import { computed, onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
import products from '@/products.json';
import CarouselImages from '@/components/CarouselImages.vue';

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


const images_portrait = computed(() => products.map(item => item.img_landscape));
</script>

<template>
  <main>
    <!-- DESTACAODS -->
    <section class="pb-10">
      <h1 class="sectionTitle">DESTACADOS</h1>
      <div class="destacadosContainer">
        <CarouselImages :images="images_portrait" :showArrows="!isMobile" :hide-delimiter-background="true" :cycle="true" :interval="destacadosInterval" />
      </div>
    </section>

    <!-- NUESTROS PRODUCTOS -->
    <section class="separatedSection pt-5">
      <h1 class="sectionTitle">NUESTROS PRODUCTOS</h1>

      <div class="nuestrosProductosContainer">
        <div class="card" v-for="product in products">
          <div class="imageContainer">
            <CarouselImages :images="product.img_portrait" :showArrows="'hover'" :hide-delimiter-background="true" />
          </div>
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
  margin-top: $appbar-height;
  padding-top: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;


  padding-bottom: 10rem; // Sacar, es para darle espaciado en dev

  section {
    width: 100%;

    .sectionTitle {
      font-size: 2.5rem;
      font-family: $secondary-font;
      text-align: center;
    }

    .destacadosContainer {
      height: 70vh;
      width: 100%;
      padding: 0rem 1rem;
    }
    .nuestrosProductosContainer {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: start;
      flex-wrap: wrap;
      row-gap: 2rem;
      padding-top: 1rem;

      .card {
        width: 40%;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        box-shadow: 0px 15px 15px 0px rgba(0, 0, 0, 0.1);


        .imageContainer {
          width: 100%;
          height: auto;
          //aspect-ratio: 9/16;
          aspect-ratio: 3/4;
          object-fit: cover;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
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

  .separatedSection {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      height: 1px;
      background-color: rgba($color: #000000, $alpha: 0.5);
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

  .separatedSection {

    &::before {
      width: 85%;
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