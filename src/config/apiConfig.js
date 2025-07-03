export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_URL,
    TIMEOUT: 10000,
    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
};

export const ENDPOINTS = {
    TODOS: '/todos',
    TODO_BY_ID: (id) => `/todos/${id}`,

    // Future endpoints can be added here
    // USERS: '/users',
    // USER_BY_ID: (id) => `/users/${id}`,
    // CATEGORIES: '/categories',
    // SEARCH_TODOS: (query) => `/todos/search?q=${encodeURIComponent(query)}`,
};

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
};

export default API_CONFIG; 