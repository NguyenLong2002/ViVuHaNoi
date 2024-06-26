<script setup>
import { computed, defineProps, defineEmits } from 'vue';
  
const props = defineProps({
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true,
      default: 10
    },
    modelValue: {
      type: Number,
      required: true
    }
  });
  
  const emit = defineEmits(['update:modelValue','scroll-to-top']);
  
  const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));
  const currentPage = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  });
  
  const displayPages = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    const pages = [];
  
    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, 4, 5, '...', total);
      } else if (current >= total - 2) {
        pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
      } else {
        pages.push(1, '...', current - 1, current, current + 1, '...', total);
      }
    }
  
    return pages;
  });
  
  const changePage = (page) => {
    if (page === '...') return;
    if (page > 0 && page <= totalPages.value) {
      currentPage.value = page;
      scrollToTop();
    }
  };
  const scrollToTop = () => {
    console.log("Emitting scroll-to-top event");
    emit('scroll-to-top');
  }
</script>
<template>
    <nav  v-if="totalPages > 1" aria-label="Page navigation example">
        <ul class="flex items-center -space-x-px h-8 text-base">
            <li>
                <button @click="changePage(currentPage - 1)" 
                    :class="['flex items-center justify-center px-4 h-10 leading-tight border border-e-0 rounded-s-lg',
                        { 'bg-white text-gray-500 hover:bg-primary hover:text-secondary dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': currentPage !== 1, 
                        'bg-gray-200 text-gray-400 cursor-not-allowed': currentPage === 1 }]">
                        <font-awesome-icon :icon="['fas', 'chevron-left']" />
                </button>
            </li>
            <li v-for="page in displayPages" :key="page">
                <button  @click="changePage(page)" 
                    :class="['flex items-center justify-center px-4 h-10 leading-tight border', 
                        { 'bg-white text-gray-500 hover:bg-primary hover:text-secondary dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': currentPage !== page, 
                        'bg-primary text-secondary border-primary': currentPage === page }]">

                    {{ page }}
                </button>
            </li>
            <li>
                <button @click="changePage(currentPage + 1)" 
                :class="['flex items-center justify-center px-4 h-10 leading-tight border rounded-e-lg', 
                    { 'bg-white text-gray-500 hover:bg-primary hover:text-secondary dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': currentPage !== totalPages,
                    'bg-gray-200 text-gray-400 cursor-not-allowed': currentPage === totalPages }]">
                        <font-awesome-icon :icon="['fas', 'chevron-right']" />
                </button>
            </li>
        </ul>
    </nav>
</template>
  

  
  <style scoped>
  
  </style>
  