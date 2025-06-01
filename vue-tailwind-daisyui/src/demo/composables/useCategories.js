import { ref } from "vue";
import { useApiFetch } from "./useApiFetch";
import { apiRoutes } from "../api";

/**
 * A custom composable function to manage the fetching of categories data using a reactive approach.
 * It utilizes `useApiFetch` for handling API requests.
 *
 * @return {Object} Returns an object containing:
 * - `categories`: The reactive data for categories fetched from the API.
 * - `loading`: A boolean indicating whether the data is being loaded.
 * - `error`: Any error encountered during the fetch operation.
 * - `refetch`: A function to manually refetch the categories data.
 */
export function useCategories() {
    // Use a static dummy ref to trigger fetch on mount
    const triggerRef = ref(true);

    const {
        data: categories,
        loading,
        error,
        refetch,
    } = useApiFetch({
        sourceRef: triggerRef,
        routeFn: () => apiRoutes.getCategories(), // route does not depend on input
        immediate: true,
    });

    return {
        categories,
        loading,
        error,
        refetch,
    };
}
