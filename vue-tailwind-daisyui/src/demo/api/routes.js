export const apiRoutes = {
    categories: {
        list: () => "/categories",
        detail: (id) => `/categories/${id}`,
        topics: (id) => `/categories/${id}/topics`,
    },
    topics: {
        update: (topicId) => `/topics/${topicId}`,
        delete: (topicId) => `/topics/${topicId}`,
    },
    auth: {
        login: () => "/auth/login",
        logout: () => "/auth/logout",
        refresh: () => "/auth/refresh",
    },
};