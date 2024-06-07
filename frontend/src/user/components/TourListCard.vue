
<template>
    <div class="grid grid-cols-3 gap-8">
      <TourCard v-for="tour in tours" :key="tour._id" :tour="tour" />
    </div>
</template>

<script setup>
import TourCard from './TourCard.vue';
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  store.dispatch('tour/getTours');
});

const tours = computed(() => store.state.tour.tours);
</script>