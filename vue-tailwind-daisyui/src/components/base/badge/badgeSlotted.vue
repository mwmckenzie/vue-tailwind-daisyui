<script setup>
import { ButtonModel } from "@/js/models.js";
import {INPUT_TYPES, SVG_ICONS_HTML, SVG_OPTIONS} from "@/js/constants.js";
import InjectectableHtmlSvg from "@/components/svgs/injectectableHtmlSvg.vue";
import LabeledInputWithSvg from "@/components/base/input/labeledInputWithSvg.vue";
import {buttons} from "@/demo/js/constants.js";
import LabeledInputSlotted from "@/components/base/input/labeledInputSlotted.vue";
import {ref} from "vue";
import label from "daisyui/components/label/index.js";
import ButtonSlotted from "@/components/base/input/buttonSlotted.vue";

const props = defineProps({
  closable: {
    type: Boolean,
    default: true,
    required: false,
  }
})


const emit = defineEmits({
  badgeClosed: () => buttonModel,
});

function buttonClick() {
  emit('buttonClicked', buttonModel);
}

</script>


<template>
  <span class="badge badge-soft">
    <slot/>
    <ButtonSlotted :if="closable" :button-model="buttons.close" class="size-4 btn-neutral btn-ghost">
<!--      <InjectectableHtmlSvg class="size-2"-->
<!--                            viewBox="0 0 16 16"-->
<!--                            :fill="SVG_OPTIONS.FILL_TYPES.CURRENT_COLOR"-->
<!--                            stroke-width="0"-->
<!--                            :svg-html-data="buttons.close.svgHtmlData"/>-->
      X
    </ButtonSlotted>
    
    
  </span>
</template>