<script setup lang="ts">
import {slotTypes} from "@/js/constants.js";
import {useAppConfigStore} from "@/stores/appConfigStore.js";
import DataThemeSlotted from "@/components/base/container/dataThemeSlotted.vue";
import PageContainerPaddedSlotted from "@/components/base/container/pageContainerPaddedSlotted.vue";

const appConfigStore = useAppConfigStore();

</script>

<template>
  <DataThemeSlotted :current-theme="appConfigStore.theme" >

    <div class="transition-colors duration-500 bg-base-200 drawer mx-auto my-auto max-w-[100rem] min-h-screen">
      <div class="drawer-content flex flex-col">

        <slot :name="slotTypes.HEADER_OUTER"/>

        <PageContainerPaddedSlotted>

          <slot :name="slotTypes.HEADER"/>

          <slot/>

          <slot :name="slotTypes.FOOTER"/>

        </PageContainerPaddedSlotted>

        <slot :name="slotTypes.FOOTER_OUTER"/>

      </div>
    </div>
  </DataThemeSlotted>
</template>
