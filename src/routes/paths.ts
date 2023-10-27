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
    story: {
      root: `${ROOTS.DASHBOARD}/story/0`,
      seven: `${ROOTS.DASHBOARD}/story/1`,
      eight: `${ROOTS.DASHBOARD}/story/2`,
      nine: `${ROOTS.DASHBOARD}/story/3`,
      ten: `${ROOTS.DASHBOARD}/story/4`,
      eleven: `${ROOTS.DASHBOARD}/story/5`,
      twelve: `${ROOTS.DASHBOARD}/story/6`,
      thirteen: `${ROOTS.DASHBOARD}/story/7`,
      fourteen: `${ROOTS.DASHBOARD}/story/8`,
      fifthteen: `${ROOTS.DASHBOARD}/story/9`,
    },
    quizGroup: {
      root: `${ROOTS.DASHBOARD}/three`,
      seven: `${ROOTS.DASHBOARD}/group/svi-kvizovi`,
      results: `${ROOTS.DASHBOARD}/quizGroup/results`,
    },
    profile: `${ROOTS.DASHBOARD}/profile`,
  },
};
