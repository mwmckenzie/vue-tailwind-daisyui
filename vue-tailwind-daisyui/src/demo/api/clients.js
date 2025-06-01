import api from "./index.js";
import { apiRoutes } from "./routes.js";

/**
 * An object containing methods for interacting with the API clients
 * related to categories and topics management, including CRUD operations.
 * Each method uses appropriate HTTP requests (GET, POST, PUT, DELETE) to
 * communicate with the API endpoints defined in `apiRoutes`.
 *
 * Categories:
 * - `getCategories` - Retrieve a list of all categories.
 * - `getCategoryDetail` - Fetch a category's details by its ID.
 * - `createCategory` - Create a new category.
 * - `updateCategory` - Update a category by its ID.
 * - `deleteCategory` - Delete a category by its ID.
 *
 * Topics:
 * - `getTopicsForCategory` - Retrieve all topics under a specific category by its ID.
 * - `getTopicDetail` - Fetch a specific topic's details by its ID.
 * - `createTopic` - Create a new topic under a category by its ID.
 * - `updateTopic` - Update an existing topic by its ID.
 * - `deleteTopic` - Remove a topic by its ID.
 */
export const apiClients = {
    // ── Categories CRUD ───────────────────────────────────

    // Fetch all categories
    getCategories: () => api.get(apiRoutes.categories.list()),

    // Fetch a single category by ID
    getCategoryDetail: (categoryId) =>
        api.get(apiRoutes.categories.detail(categoryId)),

    // Create a new category (POST /categories)
    createCategory: (body) =>
        api.post(apiRoutes.categories.list(), body),

    // Update an existing category (PUT /categories/:id)
    updateCategory: (categoryId, body) =>
        api.put(apiRoutes.categories.detail(categoryId), body),

    // Delete a category (DELETE /categories/:id)
    deleteCategory: (categoryId) =>
        api.delete(apiRoutes.categories.detail(categoryId)),

    // ── Topics CRUD ───────────────────────────────────────

    // Fetch all topics under a specific category (GET /categories/:id/topics)
    getTopicsForCategory: (categoryId) =>
        api.get(apiRoutes.categories.topics(categoryId)),

    // Fetch a single topic by ID (GET /topics/:id)
    getTopicDetail: (topicId) =>
        api.get(apiRoutes.topics.detail(topicId)),

    // Create a new topic under a specific category (POST /categories/:id/topics)
    createTopic: (categoryId, body) =>
        api.post(apiRoutes.categories.topics(categoryId), body),

    // Update an existing topic (PUT /topics/:id)
    updateTopic: (topicId, body) =>
        api.put(apiRoutes.topics.detail(topicId), body),

    // Delete a topic (DELETE /topics/:id)
    deleteTopic: (topicId) =>
        api.delete(apiRoutes.topics.detail(topicId)),
};
