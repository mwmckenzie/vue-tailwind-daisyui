import { createMemoryHistory, createRouter } from 'vue-router'

import CategoryEditorView from "@/demo/views/categoryEditorView.vue";
import ExampleContainer from "@/demo/views/example-container.vue";
import ResponsiveColumnView from "@/demo/views/ResponsiveColumnView.vue";
import {APP_ROUTES} from "@/js/constants.js";
import DemoCompositesView from "@/demo/views/demoCompositesView.vue";


const routes = [
    { path: APP_ROUTES.HOME, component: DemoCompositesView },
    { path: APP_ROUTES.EXAMPLE_CONTAINER, component: ExampleContainer },
    { path: APP_ROUTES.CATEGORY_EDITOR_VIEW, component: CategoryEditorView },
    { path: APP_ROUTES.RESPONSIVE_COLUMN_VIEW, component: ResponsiveColumnView },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router