<script setup>
import {SvgModel} from "@/js/models.js";
import svgModel from "lodash";
import {computed} from "vue";

const props = defineProps({
  svgModel: {
    type: SvgModel,
    required: true,
  }
})

console.log(props.svgModel);
console.log(`size-${props.svgModel.size}`);

const classes = computed(() => `size-${props.svgModel.size}`);

</script>

<template>

  <svg :class="classes" xmlns="http://www.w3.org/2000/svg" :viewBox="props.svgModel.viewBox">
    <g :stroke-linejoin="props.svgModel.strokeLinejoin"
       :stroke-linecap="props.svgModel.strokeLinecap"
       :stroke-width="props.svgModel.strokeWidth"
       :fill="props.svgModel.fill"
       :stroke="props.svgModel.stroke">
      <slot/>
    </g>
  </svg>

</template>
