<script setup>
import ExampleNavbar from "@/components/example-navbar.vue";
import ExampleContainer from "@/components/example-container.vue";
import { INJECTABLES } from "@/js/constants.js";
import { EventBus } from '@/js/globalEventBus.js';
import { eventTypes } from '@/js/constants.js';
import { useAppConfigStore } from "@/stores/appConfigStore.js";
import { onMounted, provide, ref } from "vue";
import DataThemeSlotted from "@/components/base/container/dataThemeSlotted.vue";
import CategoryEditorView from "@/demo/views/categoryEditorView.vue";
import ButtonSlotted from "@/components/base/input/buttonSlotted.vue";
import RowBufferedSlotted from "@/components/base/row/rowBufferedSlotted.vue";
import {ButtonModel} from "@/js/models.js";


const appConfigStore = useAppConfigStore();
const appEventBus = new EventBus();

provide(INJECTABLES.APP_EVENT_BUS, appEventBus);

onMounted(() => {
  appEventBus.on(eventTypes.THEME_SWITCH_REQUESTED,
      () => { appConfigStore.setNextTheme(); }
  );
});

const handleToggleThemeClick = () => {
  appEventBus.emit(eventTypes.THEME_SWITCH_REQUESTED);
}

const cycleThemeButton = new ButtonModel("cycle-theme", "cycle-theme", "Cycle Theme");

</script>

<template>

<!--  <example-container :current-theme="appConfigStore.theme"/>-->
  <DataThemeSlotted :current-theme="appConfigStore.theme">
    
    <example-navbar/>
    
    <RowBufferedSlotted class="space-x-2 justify-start py-2">
      <ButtonSlotted class="btn-outline btn-primary"
                     :button-model="cycleThemeButton"
                     @button-clicked="handleToggleThemeClick">
        {{ cycleThemeButton.label }}
      </ButtonSlotted>
      <div>{{ appConfigStore.theme }}</div>
    </RowBufferedSlotted>
    
    <RouterView />
    
  </DataThemeSlotted>
</template>


