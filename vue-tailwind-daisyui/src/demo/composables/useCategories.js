import {ref} from "vue";
import {useApiFetch} from "./useApiFetch";
import {apiClients} from "@/demo/api/clients";

/**
 * Custom hook for managing category data including fetching, creating, updating, and deleting categories.
 *
 * @return {Object} An object containing the following properties and methods:
 * - {Ref} categories: Reactive reference containing the list of categories.
 * - {Ref} loading: Reactive reference indicating the loading state.
 * - {Ref} error: Reactive reference containing any errors during API calls.
 * - {Function} refetch: Function to manually refetch the category list.
 * - {Function} createCategory: Function to create a new category.
 * - {Function} updateCategory: Function to update an existing category.
 * - {Function} deleteCategory: Function to delete a category by ID.
 */
export function useCategories() {
    // A dummy ref to trigger the initial fetch
    const triggerRef = ref(true);

    const {
        data: categories,
        loading,
        error,
        refetch
    } =
        useApiFetch({
            sourceRef: triggerRef,
            apiFn: () => apiClients.getCategories(),
            immediate: true,
            debounceMs: 0,
        });

    /**
     * Asynchronous function to create a new category by sending the provided data to the API.
     * After a successful API call, the category list will be refreshed.
     *
     * @param {Object} body - The data for the new category to be created.
     * @returns {Promise<Object>} The response data from the API after creating the category.
     * @throws {Error} Throws an error if the API fails to create the category.
     */
    const createCategory = async (body) => {
        try {
            const response = await apiClients.createCategory(body);
            // Refresh the list
            await refetch();
            return response.data;
        } catch (e) {
            // Re-throw so caller can handle
            throw e;
        }
    };

    /**
     * Updates a category with the given data.
     *
     * @param {string} categoryId - The unique identifier for the category to be updated.
     * @param {Object} body - The data to update the category with, typically including updated attributes.
     * @returns {Promise<Object>} A promise that resolves to the updated category data from the server.
     * @throws Will throw an error if the update operation fails.
     */
    const updateCategory = async (categoryId, body) => {
        try {
            const response = await apiClients.updateCategory(categoryId, body);
            // Refresh the list
            await refetch();
            return response.data;
        } catch (e) {
            throw e;
        }
    };

    /**
     * Deletes a category identified by the provided category ID.
     *
     * This function attempts to delete a category using the API client
     * and subsequently triggers a refresh of the category list.
     * If the deletion process fails, the error is caught and re-thrown.
     *
     * @param {string} categoryId - The unique identifier of the category to be deleted.
     * @throws {Error} Throws an error if the API client fails to delete the category.
     */
    const deleteCategory = async (categoryId) => {
        try {
            await apiClients.deleteCategory(categoryId);
            // Refresh the list
            await refetch();
        } catch (e) {
            throw e;
        }
    };

    return {
        categories,
        loading,
        error,
        refetch,
        createCategory,
        updateCategory,
        deleteCategory,
    };
}
