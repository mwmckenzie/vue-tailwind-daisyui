<script setup>
import {
  SVG_FILL_TYPES,
  SVG_STROKE_LINECAP,
  SVG_STROKE_LINEJOIN,
  SVG_STROKE_TYPES
} from "@/js/constants.js";

const props = defineProps({
  svgHtmlData: {
    type: String,
    default: null
  },
  strokeWidth: {
    type: String,
    default: "2"
  },
  fill: {
    type: String,
    default: SVG_FILL_TYPES.NONE
  },
  stroke: {
    type: String,
    default: SVG_STROKE_TYPES.CURRENT_COLOR
  },
  strokeLinejoin: {
    type: String,
    default: SVG_STROKE_LINEJOIN.ROUND
  },
  strokeLinecap: {
    type: String,
    default: SVG_STROKE_LINECAP.ROUND
  },
})
</script>

<template>
  <svg class="size-4"
       xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 24 24">
    <g :stroke-linejoin="strokeLinejoin"
       :stroke-linecap="strokeLinecap"
       :stroke-width="strokeWidth"
       :fill="fill"
       :stroke="stroke"
       v-html="svgHtmlData">
    </g>
  </svg>
</template>