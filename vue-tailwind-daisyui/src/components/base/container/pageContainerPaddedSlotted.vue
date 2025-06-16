<script setup>

import {computed} from "vue";

const props = defineProps({
  paddingX: {
    type: Number,
    default: 8
  },
  paddingY: {
    type: Number,
    default: 6
  }
})

const paddingClasses = computed(() => `px-${props.paddingX} py-${props.paddingY}`);
</script>

<template>
  <div class="flex-1" :class="paddingClasses">
    <slot/>
  </div>
</template>