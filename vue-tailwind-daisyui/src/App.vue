<script setup>
import ExampleNavbar from "@/components/example-navbar.vue";
import ExampleContainer from "@/components/example-container.vue";
import { INJECTABLES } from "@/js/constants.js";
import { EventBus } from '@/js/globalEventBus.js';
import { eventTypes } from '@/js/globalEventBus.js';
import { useAppConfigStore } from "@/stores/appConfigStore.js";
import { onMounted, provide, ref } from "vue";
import DataThemeSlotted from "@/components/base/container/dataThemeSlotted.vue";
import CategoryEditorView from "@/demo/views/categoryEditorView.vue";


const appConfigStore = useAppConfigStore();
const appEventBus = new EventBus();

provide(INJECTABLES.APP_EVENT_BUS, appEventBus);

onMounted(() => {
  appEventBus.on(eventTypes.THEME_SWITCH_REQUESTED,
      () => { appConfigStore.setNextTheme(); }
  );
});

</script>

<template>
  <example-navbar/>
<!--  <example-container :current-theme="appConfigStore.theme"/>-->
  <DataThemeSlotted :current-theme="appConfigStore.theme">
    <CategoryEditorView/>
  </DataThemeSlotted>
</template>


