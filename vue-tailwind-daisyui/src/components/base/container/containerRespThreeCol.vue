<script setup>
import ResponsiveGridColsSlotted from "@/components/base/container/responsiveGridColsSlotted.vue";
import {slotTypes} from "@/js/constants.js";
import ContainerColumnSlotted from "@/components/base/container/containerColumnSlotted.vue";

</script>

<template>

  <ResponsiveGridColsSlotted>
    
    <ContainerColumnSlotted>
      <slot :name="slotTypes.COLUMN_ONE"/>
    </ContainerColumnSlotted>
    
    <ContainerColumnSlotted>
      <slot :name="slotTypes.COLUMN_TWO"/>
    </ContainerColumnSlotted>
    
    <ContainerColumnSlotted>
      <slot :name="slotTypes.COLUMN_THREE"/>
    </ContainerColumnSlotted>
  </ResponsiveGridColsSlotted>
  
</template>

