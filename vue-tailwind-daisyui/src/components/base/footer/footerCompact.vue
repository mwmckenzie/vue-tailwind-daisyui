<script setup lang="ts">

import LabeledInputSlotted from "@/components/base/input/labeledInputSlotted.vue";
import InjectectableHtmlSvg from "@/components/svgs/injectectableHtmlSvg.vue";
import { buttons } from "@/demo/js/constants.js";

const callback = () => {
  console.log();
};

</script>

<template>
  <footer class="flex flex-col sm:flex-row gap-8 justify-between p-10 bg-base-100">

    <!-- Brand -->
    <aside>
      <p class="text-3xl flex items-center gap-2">
        <InjectectableHtmlSvg :svg-html-data="buttons.componentBlocks.svgHtmlData"/>
<!--        <img alt="Logo" src="/daisy-components/logo.svg" class="inline w-6" />-->
        Company
      </p>
      <small>Copyright © 2024 - All rights reserved</small>
    </aside>

    <!-- Socials -->
    <nav class="flex gap-4">
      <LabeledInputSlotted :button-model="buttons.componentBlocks"
                           @button-clicked="callback">
        <InjectectableHtmlSvg :svg-html-data="buttons.componentBlocks.svgHtmlData"/>
      </LabeledInputSlotted>
      <LabeledInputSlotted :button-model="buttons.componentBlocks"
                           @button-clicked="callback">
        <InjectectableHtmlSvg :svg-html-data="buttons.componentBlocks.svgHtmlData"/>
      </LabeledInputSlotted>
      <LabeledInputSlotted :button-model="buttons.componentBlocks"
                           @button-clicked="callback">
        <InjectectableHtmlSvg :svg-html-data="buttons.componentBlocks.svgHtmlData"/>
      </LabeledInputSlotted>
<!--      <a class="btn btn-ghost btn-sm btn-circle">-->
<!--        <i class="fa-brands fa-github text-2xl"></i>-->
<!--      </a>-->
<!--      <a class="btn btn-ghost btn-sm btn-circle">-->
<!--        <i class="fa-brands fa-twitter text-2xl"></i>-->
<!--      </a>-->
<!--      <a class="btn btn-ghost btn-sm btn-circle">-->
<!--        <i class="fa-brands fa-facebook text-2xl"></i>-->
<!--      </a>-->
<!--      <a class="btn btn-ghost btn-sm btn-circle">-->
<!--        <i class="fa-brands fa-youtube text-2xl"></i>-->
<!--      </a>-->
    </nav>
  </footer>
</template>

