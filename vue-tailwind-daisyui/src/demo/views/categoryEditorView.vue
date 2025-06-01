<script setup>
import ButtonSlotted from "@/components/base/input/buttonSlotted.vue";
import RowBufferedSlotted from "@/components/base/row/rowBufferedSlotted.vue";
import {inject} from "vue";
import {INJECTABLES} from "@/js/constants.js";
import {eventTypes} from "@/js/globalEventBus.js";
import {ButtonModel} from "@/js/models.js";
import PageBkgdTransitionSlotted from "@/components/base/container/pageBkgdTransitionSlotted.vue";
import PageContainerPaddedSlotted from "@/components/base/container/pageContainerPaddedSlotted.vue";
import ContainerColumnSlotted from "@/components/base/container/containerColumnSlotted.vue";
import CardSlotted from "@/components/base/card/cardSlotted.vue";
import CardElemHeader from "@/components/base/card/cardElemHeader.vue";
import CardBodySlotted from "@/components/base/card/cardBodySlotted.vue";

const props = defineProps({
  currentTheme: String
})

const appEventBus = inject(INJECTABLES.APP_EVENT_BUS)

const handleToggleThemeClick = () => {
  appEventBus.emit(eventTypes.THEME_SWITCH_REQUESTED);
}

const cycleThemeButton = new ButtonModel("cycle-theme", "cycle-theme", "Cycle Theme");



import { ref } from "vue";
import { useCategories } from "@/demo/composables/useCategories";

// 1. Pull in everything from useCategories()
const {
  categories,
  loading,
  error,
  refetch,
  createCategory,
  deleteCategory,
} = useCategories();

// 2. Local refs for the “create” form
const newName = ref("");
const creating = ref(false);
const createError = ref(null);

// 3. Handler to create a category
const onCreateCategory = async () => {
  if (!newName.value.trim()) return;

  creating.value = true;
  createError.value = null;

  try {
    await createCategory({ name: newName.value.trim() });
    newName.value = "";
    // refetch() is already called internally by createCategory, so the list updates
  } catch (e) {
    createError.value = e;
  } finally {
    creating.value = false;
  }
};

// 4. Handler to delete a category
const onDeleteCategory = async (id) => {
  // Optionally confirm before deleting:
  if (!confirm("Delete this category?")) return;

  try {
    await deleteCategory(id);
    // deleteCategory() already calls refetch() internally, so the list updates
  } catch (e) {
    // You could show a toast or set a local error state, but for brevity we just log:
    console.error("Failed to delete:", e);
  }
};

</script>

<template>
  
  <RowBufferedSlotted class="space-x-2 justify-start py-2">
    <ButtonSlotted class="btn-outline btn-primary"
                   :button-model="cycleThemeButton"
                   @button-clicked="handleToggleThemeClick">
      {{ cycleThemeButton.label }}
    </ButtonSlotted>
    <div>{{ currentTheme }}</div>
  </RowBufferedSlotted>
  
  <PageBkgdTransitionSlotted>
    <PageContainerPaddedSlotted>
      <ContainerColumnSlotted>
        
        <CardSlotted>
          <CardBodySlotted>
            <card-elem-header>
              <div class="text-base">Card Header</div>
            </card-elem-header>
            
            
          </CardBodySlotted>
        </CardSlotted>
        
      </ContainerColumnSlotted>
    </PageContainerPaddedSlotted>
  </PageBkgdTransitionSlotted>

  <div class="card bg-base-100 shadow p-4 space-y-6">
    <!-- Loading / Error States -->
    <div v-if="loading" class="alert alert-info">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
           viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m0-4h.01M12 20.999a8.999 8.999 0 110-17.998 8.999 8.999 0 010 17.998z" />
      </svg>
      <span>Loading categories…</span>
    </div>
    <div v-else-if="error" class="alert alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
           viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M18.364 5.636l-1.414-1.414L12 9.172 7.05 4.222 5.636 5.636 10.586 10.586l-5 5 1.414 1.414L12 12l4.95 4.95 1.414-1.414-5-5 4.95-4.95z" />
      </svg>
      <span>Error loading categories: {{ error.message }}</span>
    </div>

    <!-- Category List -->
    <ul v-else class="space-y-3">
      <li v-for="cat in categories" :key="cat.id">
        
        <RowBufferedSlotted class="bg-base-200 shadow-sm flex justify-between items-center p-3 rounded-lg">
            <span class="font-medium">{{ cat.name }}</span>
            <button class="btn btn-error btn-sm" @click="onDeleteCategory(cat.id)">
              Delete
            </button>
        </RowBufferedSlotted>
        
      </li>
    </ul>

    <!-- Create Category Form -->
    <div class="card bg-base-200 shadow-sm p-4 rounded-lg">
      <h2 class="text-lg font-semibold mb-3">Add a New Category</h2>
      <form @submit.prevent="onCreateCategory" class="flex space-x-2 items-center">
        <div class="form-control flex-grow">
          <input
              v-model="newName"
              type="text"
              placeholder="Category name"
              class="input input-bordered w-full"
          />
        </div>
        <button
            type="submit"
            class="btn btn-primary"
            :disabled="creating"
        >
          {{ creating ? "Creating…" : "Create" }}
        </button>
      </form>
      <div v-if="createError" class="mt-2 text-sm text-error">
        {{ createError.message }}
      </div>
    </div>
  </div>
  
</template>

