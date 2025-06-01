import { useApiFetch } from "./useApiFetch";
import {apiClients} from "@/demo/api/clients.js";

/**
 * Fetches topics for a given category using an API client. This hook is designed to debounce requests
 * and waits for a valid `categoryIdRef` before fetching.
 *
 * @param {Ref} categoryIdRef - A reference to the category identifier. The API fetch will trigger once
 *                              this reference has a valid value.
 * @return {Object} An object containing the following properties:
 *                  - topics: The fetched topics data.
 *                  - loading: A boolean indicating the loading state of the fetch operation.
 *                  - error: Any error encountered during the fetch operation.
 *                  - refetch: A function to manually trigger a refetch.
 */
export function useApiFetchTopics(categoryIdRef) {
    const {
        data: topics,
        loading,
        error,
        refetch,
    } = useApiFetch({
        sourceRef: categoryIdRef,
        apiFn: (id) => apiClients.getTopicsForCategory(id),
        debounceMs: 300,
        immediate: false, // only fetch after categoryIdRef has a value
    });

    return {
        topics,
        loading,
        error,
        refetch,
    };
}
