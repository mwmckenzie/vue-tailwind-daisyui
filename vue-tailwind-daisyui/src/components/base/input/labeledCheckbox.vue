<script setup>
import { CheckboxModel } from "@/js/models.js";

const props = defineProps({
  checkboxModel: {
    type: CheckboxModel,
    required: true,
  }
})

const emit = defineEmits({
  checkboxChanged: (checkboxModel) => checkboxModel 
});

function handleCheckboxChange(checkboxModel, checkboxValue) {
  checkboxModel.checked = checkboxValue;
  emit('checkboxChanged', checkboxModel);
}
</script>

<template>
  <label class="flex cursor-pointer items-center gap-2 select-none">
    <input checked=""
           class="checkbox checkbox-sm"
           type="checkbox" @change="handleCheckboxChange(checkboxModel, $event.target.checked)">
    <span>{{ checkboxModel.label }}</span>
  </label>
</template>