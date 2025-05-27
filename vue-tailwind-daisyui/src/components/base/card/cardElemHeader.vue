<script setup>
import {ButtonModel} from "../../../js/models.js";

const props = defineProps({
  buttonModel: {
    type: ButtonModel,
    required: false,
  }
})

const emit = defineEmits({
  buttonClicked: (buttonModel) => buttonModel,
});

function buttonClick(buttonModel) {
  emit('buttonClicked', buttonModel);
}

</script>


<template>
  <h2 class="flex items-center justify-between">
    
    <slot/>
  </h2>
</template>