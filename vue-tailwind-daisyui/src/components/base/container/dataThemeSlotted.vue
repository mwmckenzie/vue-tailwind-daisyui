<script setup>

const props = defineProps({
  currentTheme: String
})

</script>

<template>
  <div :data-theme="currentTheme">
    <slot/>
  </div>
</template>