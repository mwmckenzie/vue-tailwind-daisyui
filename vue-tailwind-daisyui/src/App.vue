<script setup>
import Navbar from "./components/navbar.vue";
import ExampleNoInline from "./components/example-no-inline.vue";
import constants from "./js/constants.js";
import eventBus from './js/eventBus.js';
import { eventTypes } from './js/eventBus.js';
import { useAppConfigStore } from "./stores/appConfigStore.js";
import {onMounted, provide, ref} from "vue";

const appConfigStore = useAppConfigStore();

const appEventBus = eventBus;

provide(constants.INJECTABLES.APP_EVENT_BUS, appEventBus);

onMounted(() => {
  appEventBus.on(eventTypes.THEME_SWITCH_REQUESTED,
      () => { appConfigStore.setNextTheme(); }
  );
});



</script>

<template>
  <navbar/>
  <example-no-inline :current-theme="appConfigStore.theme"/>
</template>


