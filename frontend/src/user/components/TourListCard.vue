
<template>
    <div class="grid grid-cols-3 gap-8">
      <TourCard v-for="tour in toursFeatured" :key="tour._id" :tour="tour" />
    </div>
</template>

<script setup>
import TourCard from './TourCard.vue';
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  store.dispatch('tour/getToursFeatured');
});

const toursFeatured = computed(() => store.state.tour.toursFeatured);


</script>