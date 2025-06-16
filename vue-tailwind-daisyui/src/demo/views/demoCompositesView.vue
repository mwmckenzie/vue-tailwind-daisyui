<script setup lang="ts">

import ContainerRespThreeCol from "@/components/base/container/containerRespThreeCol.vue";
import CardSlotted from "@/components/base/card/cardSlotted.vue";
</script>

<template>
  <ContainerRespThreeCol>

    <template #column-one>

      <CardSlotted>
        <template #header-outer>
          <div class="bg-base-300 p-4">
            This is the header outer!
          </div>
        </template>

        <template #header>
          <div class="bg-base-200 p-2">
            This is the header (inner)!
          </div>
        </template>
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
</template>

