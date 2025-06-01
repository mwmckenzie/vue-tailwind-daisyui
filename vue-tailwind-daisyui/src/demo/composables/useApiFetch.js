import { ref, watch, onMounted } from "vue";
import { debounce as lodashDebounce } from "lodash";
import api from "../api";

/**
 * A custom composable function to handle API fetching with optional debounce and immediate execution capabilities.
 *
 * @param {Object} options Configuration object for the function.
 * @param {Ref} options.sourceRef A Vue ref containing the source value to trigger the fetch operation.
 * @param {Function} options.routeFn A function that generates the API endpoint URL based on the input value from `sourceRef`.
 * @param {boolean} [options.immediate=true] Determines whether the fetch should execute immediately when the component is mounted.
 * @param {number} [options.debounceMs=0] Specifies the debounce delay in milliseconds. When set, the fetch operation will be debounced.
 * @return {Object} An object containing the following properties:
 *   - `data`: A Vue ref holding the fetched data.
 *   - `loading`: A Vue ref indicating the loading state.
 *   - `error`: A Vue ref that holds any errors encountered during the fetch.
 *   - `refetch`: A function that can be called to manually trigger a fetch operation.
 */
export function useApiFetch({
                                sourceRef,           // ref(inputId)
                                routeFn,             // function to generate the endpoint URL: (value) => string
                                immediate = true,    // run onMounted
                                debounceMs = 0       // debounce delay
                            }) {
    const data = ref(null);
    const loading = ref(false);
    const error = ref(null);

    /**
     * Asynchronously executes a fetch operation based on a dynamic source reference.
     *
     * This function fetches data from an API endpoint derived from the current value
     * of `sourceRef`. It updates the `data`, `loading`, and `error` reactive variables
     * to track the state and result of the operation.
     *
     * Behavior:
     * - If `sourceRef.value` is not set, the function terminates without performing a request.
     * - While the request is ongoing, `loading.value` is set to `true` and `error.value` is cleared.
     * - On successful data retrieval, `data.value` is updated with the fetched data.
     * - On request failure, `error.value` is set to the caught error.
     * - The `loading.value` is set back to `false` in the `finally` block, ensuring cleanup
     *   after the operation regardless of success or failure.
     *
     * Note: This function assumes `api` is a pre-configured object with a `get` method
     * for sending HTTP GET requests, and `routeFn` is a helper function to construct the API route
     * based on the value of `sourceRef`.
     */
    const executeFetch = async () => {
        if (!sourceRef.value) return;
        loading.value = true;
        error.value = null;

        try {
            const res = await api.get(routeFn(sourceRef.value));
            data.value = res.data;
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    };

    /**
     * A function that either executes a fetch operation directly or uses a debounced version of it
     * based on the specified debounce time.
     *
     * If debounceMs is greater than zero, the fetch operation is executed with a debounced function
     * created using lodash's debounce utility. If debounceMs is zero or less, the fetch operation
     * is executed immediately without debouncing.
     *
     * debounceMs: The delay, in milliseconds, before the debounced function executes.
     * executeFetch: The core fetch operation to be invoked, either directly or as a debounced function.
     */
    const refetch = debounceMs > 0
        ? lodashDebounce(executeFetch, debounceMs)
        : executeFetch;

    watch(sourceRef, () => {
        if (!sourceRef.value) return;
        refetch();
    });

    if (immediate) {
        onMounted(executeFetch);
    }

    return {
        data,
        loading,
        error,
        refetch: executeFetch,
    };
}
