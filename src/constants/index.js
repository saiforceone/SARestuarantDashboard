export const API_ENDPOINTS = {
  BASE: 'http://localhost:4001',
  LOGIN: '/auth-local/login/',
  MENU_ITEMS: '/menu-items/',
  ORDERS: '/orders/',
  LOCATIONS: '/restaurant-locations/',
  USER_CHECK: '/users/adm-check',
};

export const ORDER_STATUSES = [
  {
    label: 'Received',
    value: 'received'
  },
  {
    label: 'In Progress',
    value: 'in-progress'
  },
  {
    label: 'Ready',
    value: 'ready'
  },
  {
    label: 'Completed',
    value: 'completed'
  },
];