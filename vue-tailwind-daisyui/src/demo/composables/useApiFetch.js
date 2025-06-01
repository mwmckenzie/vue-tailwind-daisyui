import { ref, watch, onMounted } from "vue";
import { debounce as lodashDebounce } from "lodash";

/**
 * A composable function to manage an API fetch operation with reactive states for data, loading, and error.
 * It supports features like debounce, immediate fetching, and reactive trigger on reference change.
 *
 * @param {Object} options - The options for configuring the behavior of the API fetch.
 * @param {Ref<any>} options.sourceRef - A reactive reference that triggers the fetch operation when its value changes.
 * @param {Function} options.apiFn - The API function to call, which should accept `sourceRef.value` as an argument.
 * @param {boolean} [options.immediate=true] - Determines if the fetch function should run immediately after mounting the component.
 * @param {number} [options.debounceMs=0] - The debounce time in milliseconds for fetch calls triggered by sourceRef changes. If set to 0, debouncing is disabled.
 *
 * @return {Object} Returns an object containing the following reactive properties and methods:
 * - `data` {Ref<any>} - A reactive reference that holds the fetched data.
 * - `loading` {Ref<boolean>} - A reactive reference indicating the fetch operation's loading state.
 * - `error` {Ref<Error|null>} - A reactive reference holding the error object if an error occurs during the fetch operation.
 * - `refetch` {Function} - A method to manually trigger a fetch operation without debounce.
 */
export function useApiFetch({
                                sourceRef,
                                apiFn,
                                immediate = true,
                                debounceMs = 0,
                            }) {
    const data = ref(null);
    const loading = ref(false);
    const error = ref(null);

    // Core fetch logic:
    const executeFetch = async () => {
        // If sourceRef has no value (null/undefined/empty), don’t fetch:
        if (sourceRef.value == null || sourceRef.value === "") {
            return;
        }

        loading.value = true;
        error.value = null;

        try {
            // apiFn is expected to be something like:
            //   (arg) => apiClients.getTopicsForCategory(arg)
            const response = await apiFn(sourceRef.value);
            data.value = response.data;
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    };

    // If debounceMs > 0, wrap executeFetch in lodash.debounce:
    const debouncedFetch = debounceMs > 0
        ? lodashDebounce(executeFetch, debounceMs)
        : executeFetch;

    // Whenever sourceRef changes, trigger the (possibly debounced) fetch:
    watch(
        sourceRef,
        () => {
            // Only run if there's a non‐empty value
            if (sourceRef.value == null || sourceRef.value === "") {
                return;
            }
            debouncedFetch();
        }
    );

    // If immediate is true, run once on component mount:
    if (immediate) {
        onMounted(executeFetch);
    }

    // Return reactive refs and a manual refetch (un-debounced):
    return {
        data,
        loading,
        error,
        // If you want manual calls to ignore debounce, you can expose executeFetch directly:
        refetch: executeFetch,
    };
}
