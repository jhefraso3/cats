export const API_ENDPOINTS = {
  LOGIN: {
    BASE: '/auth',
    AUTH_LOGIN: '/auth/login',
  },
  REGISTER: {
    BASE: '/register',
  },
  USERS: {
    BASE: '/users',
  },
  CATS: {
    BREEDS: '/breeds',
  },
  IMAGES: {
    BASE: '/images',
  }
} as const;