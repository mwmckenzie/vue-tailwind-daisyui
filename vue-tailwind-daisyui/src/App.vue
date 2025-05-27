<script setup>
import Navbar from "./components/navbar.vue";
import ExampleNoInline from "./components/example-no-inline.vue";
import { useAppConfigStore } from "./stores/appConfigStore.js";

const appConfigStore = useAppConfigStore();
</script>

<template>
  <navbar/>
  <example-no-inline :current-theme="appConfigStore.theme"/>
</template>


