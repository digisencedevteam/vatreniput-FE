// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    one: `${ROOTS.DASHBOARD}/one`,
    two: `${ROOTS.DASHBOARD}/two`,
    three: `${ROOTS.DASHBOARD}/three`,
    four: `${ROOTS.DASHBOARD}/four`,
    five: `${ROOTS.DASHBOARD}/five`,
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      seven: `${ROOTS.DASHBOARD}/group/seven`,
      eight: `${ROOTS.DASHBOARD}/group/eight`,
    },
  },
};