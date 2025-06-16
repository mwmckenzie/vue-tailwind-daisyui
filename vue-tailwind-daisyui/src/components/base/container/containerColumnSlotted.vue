<script setup>

import {computed} from "vue";

const props = defineProps({
  gapSize: {
    type: Number,
    default: 4
  }
})

const containerClasses = computed(() => `gap-${props.gapSize}`);
</script>


<template>
  <div class="flex flex-col" :class="containerClasses">
    <slot/>
  </div>
</template>
