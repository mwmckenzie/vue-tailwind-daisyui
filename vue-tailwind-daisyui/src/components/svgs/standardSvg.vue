<script setup>
import {SVG_FILL_TYPES, SVG_STROKE_TYPES} from "@/js/constants.js";

const props = defineProps({
  svgDataComponent: {
    type: Object,
    default: null
  },
  strokeWidth: {
    type: Number,
    default: 2
  },
  fill: {
    type: String,
    default: SVG_FILL_TYPES.NONE
  },
  stroke: {
    type: String,
    default: SVG_STROKE_TYPES.CURRENT_COLOR
  },
  size: String
})
</script>

<template>
  <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g stroke-linejoin="round" stroke-linecap="round" :stroke-width="strokeWidth" :fill="fill" :stroke="stroke">
      <Component v-if="svgDataComponent" :is="svgDataComponent"/>
    </g>
  </svg>
</template>
