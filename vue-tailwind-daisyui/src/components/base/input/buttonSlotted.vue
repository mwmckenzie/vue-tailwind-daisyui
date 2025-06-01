<script setup>
import { ButtonModel } from "@/js/models.js";

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

</script>

<template>
  <button class="btn btn-neutral" @click="buttonClick">
    <slot/>
  </button>
</template>

