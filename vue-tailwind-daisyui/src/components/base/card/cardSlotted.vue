<script setup>
import { slotTypes} from "@/js/constants.js";
import CardBodySlotted from "@/components/base/card/cardBodySlotted.vue";
import CardElemHeader from "@/components/base/card/cardElemHeader.vue";

</script>


<template>
  <div class="card bg-base-100 card-border border-base-300 card-sm overflow-hidden">
    
    <slot :name="slotTypes.HEADER_OUTER"/>
    
    <CardBodySlotted>
      
      <CardElemHeader v-if="$slots.header">
        <slot :name="slotTypes.HEADER"/>
      </CardElemHeader>
      
      <slot/>
      
      <slot :name="slotTypes.FOOTER"/>
      
    </CardBodySlotted>
    
    <slot :name="slotTypes.FOOTER_OUTER"/>
    
  </div>
</template>