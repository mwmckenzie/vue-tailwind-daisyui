<script setup>

import PageBkgdTransitionSlotted from "@/components/base/container/pageBkgdTransitionSlotted.vue";
import PageContainerPaddedSlotted from "@/components/base/container/pageContainerPaddedSlotted.vue";
import ContainerRespThreeCol from "@/components/base/container/containerRespThreeCol.vue";
import CardSlotted from "@/components/base/card/cardSlotted.vue";
</script>

<template>
  <PageBkgdTransitionSlotted>
    <PageContainerPaddedSlotted>
      
      <ContainerRespThreeCol>
        
        <template #column-one>
          
          <CardSlotted>
            <template #header>
              Column One
            </template>
            Body One
          </CardSlotted>
        </template>

        <template #column-two>

          <CardSlotted>
            Two
          </CardSlotted>
          
        </template>

        <template #column-three>

          <CardSlotted>
            Three
          </CardSlotted>
          
        </template>
        
      </ContainerRespThreeCol>
      
    </PageContainerPaddedSlotted>
  </PageBkgdTransitionSlotted>

</template>

