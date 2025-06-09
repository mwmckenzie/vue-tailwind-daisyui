import { createMemoryHistory, createRouter } from 'vue-router'

import CategoryEditorView from "@/demo/views/categoryEditorView.vue";
import ExampleContainer from "@/components/example-container.vue";
import ResponsiveColumnView from "@/demo/views/ResponsiveColumnView.vue";


const routes = [
    { path: '/', component: ExampleContainer },
    { path: '/about', component: CategoryEditorView },
    { path: '/responsiveColumnView', component: ResponsiveColumnView },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router