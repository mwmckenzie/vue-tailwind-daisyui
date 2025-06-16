<script setup>
import ExampleNavbar from "@/components/base/navbar/example-navbar.vue";
import ExampleContainer from "@/demo/views/example-container.vue";
import {INJECTABLES, slotTypes} from "@/js/constants.js";
import { EventBus } from '@/js/globalEventBus.js';
import { eventTypes } from '@/js/constants.js';
import { useAppConfigStore } from "@/stores/appConfigStore.js";
import {onBeforeUnmount, onMounted, provide, ref} from "vue";
import DataThemeSlotted from "@/components/base/container/dataThemeSlotted.vue";
import CategoryEditorView from "@/demo/views/categoryEditorView.vue";
import ButtonSlotted from "@/components/base/input/buttonSlotted.vue";
import RowBufferedSlotted from "@/components/base/row/rowBufferedSlotted.vue";
import {ButtonModel} from "@/js/models.js";
import PageRootDynamicTheme from "@/components/base/page/pageRootDynamicTheme.vue";
import FooterCompact from "@/components/base/footer/footerCompact.vue";


const appConfigStore = useAppConfigStore();
const appEventBus = new EventBus();

appConfigStore.title = "Demo Vue App";


provide(INJECTABLES.APP_EVENT_BUS, appEventBus);

onMounted(() => {
  appConfigStore.loadAppTheme();
  appConfigStore.$subscribe(() => {
    appConfigStore.saveAppTheme();
  })
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
  
  <PageRootDynamicTheme>
    
    <template #[slotTypes.HEADER_OUTER]>
      
          <example-navbar :title="appConfigStore.title">
            
            <template #[slotTypes.NAV_BAR_RIGHT]>
              <div class="mr-2">{{ appConfigStore.theme }}</div>
                <ButtonSlotted class="btn-outline btn-primary"
                               :button-model="cycleThemeButton"
                               @button-clicked="handleToggleThemeClick">
                  {{ cycleThemeButton.label }}
                </ButtonSlotted>
            </template>
            
          </example-navbar>
      
    </template>

    <RouterView />
    
    <template #[slotTypes.FOOTER_OUTER]>
      <FooterCompact/>
    </template>
  </PageRootDynamicTheme>

<!--  <example-container :current-theme="appConfigStore.theme"/>-->
<!--  <DataThemeSlotted :current-theme="appConfigStore.theme">-->
<!--    -->
<!--    <example-navbar>-->
<!--      <template #[slotTypes.NAV_BAR_RIGHT]>-->
<!--        <div class="mr-2">{{ appConfigStore.theme }}</div>-->
<!--          <ButtonSlotted class="btn-outline btn-primary"-->
<!--                         :button-model="cycleThemeButton"-->
<!--                         @button-clicked="handleToggleThemeClick">-->
<!--            {{ cycleThemeButton.label }}-->
<!--          </ButtonSlotted>-->
<!--      </template>-->
<!--    </example-navbar>-->
<!--    -->
<!--    <RowBufferedSlotted class="space-x-2 justify-start py-2">-->
<!--      <ButtonSlotted class="btn-outline btn-primary"-->
<!--                     :button-model="cycleThemeButton"-->
<!--                     @button-clicked="handleToggleThemeClick">-->
<!--        {{ cycleThemeButton.label }}-->
<!--      </ButtonSlotted>-->
<!--      <div>{{ appConfigStore.theme }}</div>-->
<!--    </RowBufferedSlotted>-->
<!--    -->
<!--    <RouterView />-->
<!--    -->
<!--  </DataThemeSlotted>-->
</template>


