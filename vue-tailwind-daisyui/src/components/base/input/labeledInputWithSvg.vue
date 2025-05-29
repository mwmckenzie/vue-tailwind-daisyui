<script setup>

import InjectectableHtmlSvg from "../../svgs/injectectableHtmlSvg.vue";
import { ButtonModel } from "../../../js/models.js";


const props = defineProps({
  buttonModel: {
    type: ButtonModel,
    required: true,
  }
})

const emit = defineEmits({
  buttonClicked: (buttonModel) => buttonModel,
});

function buttonClick(buttonModel) {
  emit('buttonClicked', buttonModel);
}

const handleClick = (msg) => {
  console.log(`${msg} -> clicked`)
};
</script>


<template>
  <label class="tab"
         :title="buttonModel.label">
    <input :aria-label="buttonModel.label"
           :name="buttonModel.groupName"
           :type="buttonModel.inputType"
           :value="buttonModel.name"
           @click="buttonClick(buttonModel)">
    <InjectectableHtmlSvg :svg-html-data="buttonModel.svgHtmlData"/>
  </label>
</template>
