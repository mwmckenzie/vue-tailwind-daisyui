import { useApiFetch } from "./useApiFetch";
import { apiRoutes } from "../api";

/**
 * Fetches and manages the state of topics associated with a specific category.
 *
 * @param {Object} categoryIdRef - A reference to the ID of the category for which topics are being fetched.
 * @return {Object} An object containing the following properties:
 * - topics: The list of topics fetched from the API.
 * - loading: A boolean indicating whether the data is currently being loaded.
 * - error: An error object if an error occurred during the fetch.
 * - refetch: A function to manually trigger a refetch of the data.
 */
export function useTopics(categoryIdRef) {
    const {
        data: topics,
        loading,
        error,
        refetch,
    } = useApiFetch({
        sourceRef: categoryIdRef,
        routeFn: apiRoutes.getTopicsForCategory,
        debounceMs: 300,
    });

    return {
        topics,
        loading,
        error,
        refetch,
    };
}
