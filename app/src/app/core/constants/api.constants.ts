export const API_ENDPOINTS = {
  LOGIN: {
    BASE: '/auth/login',
  },
  REGISTER: {
    BASE: '/users/register',
  },
  USERS: {
    BASE: '/users',
  },
  BREEDS: {
    BASE: '/breeds',
  },
  IMAGES: {
    BASE: '/images',
  }
} as const;