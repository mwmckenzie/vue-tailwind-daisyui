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
  <label class="btn"
         :title="buttonModel.label">
    <input :aria-label="buttonModel.label"
           :name="buttonModel.groupName"
           :type="buttonModel.inputType"
           :value="buttonModel.label"
           @click="buttonClick(buttonModel)">
    <slot/>
  </label>
</template>

