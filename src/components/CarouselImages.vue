<script setup>
const props = defineProps({
    images: Array,
    showArrows: [String, Boolean],
    hideDelimiterBackground: Boolean,
    cycle: Boolean,
    interval: Number,
    prevIcon: { type: String, default: 'mdi-chevron-left' }, // Icono predeterminado para "prev"
    nextIcon: { type: String, default: 'mdi-chevron-right' }, // Icono predeterminado para "next"
})
</script>

<template>
    <v-carousel 
        height="100%" 
        width="100%" 
        :showArrows="props.showArrows" 
        :hide-delimiter-background="props.hideDelimiterBackground" 
        :cycle="props.cycle" 
        :interval="props.interval" 
        :prev-icon="props.prevIcon" 
        :next-icon="props.nextIcon"
    >
        <v-carousel-item v-for="image in props.images" class="slide">
        <img :src="image" />
        </v-carousel-item>
    </v-carousel>
</template>

<style lang="scss" scoped>
.slide {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>