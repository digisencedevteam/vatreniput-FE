// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  emailVerification: '/email-verification',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  quizRewardInfo: '/quiz-reward-info',
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    one: `${ROOTS.DASHBOARD}/one`,
    collection: `${ROOTS.DASHBOARD}/collection`,
    quizzes: `${ROOTS.DASHBOARD}/quizzes`,
    four: `${ROOTS.DASHBOARD}/four`,
    votings: `${ROOTS.DASHBOARD}/votings`,
    nine: `${ROOTS.DASHBOARD}/nine`,
    story: {
      root: `${ROOTS.DASHBOARD}/story/0`,
      sp98: `${ROOTS.DASHBOARD}/story/1`,
      euro00: `${ROOTS.DASHBOARD}/story/2`,
      sp02: `${ROOTS.DASHBOARD}/story/3`,
      euro04: `${ROOTS.DASHBOARD}/story/4`,
      sp06: `${ROOTS.DASHBOARD}/story/5`,
      euro08: `${ROOTS.DASHBOARD}/story/6`,
      sp10: `${ROOTS.DASHBOARD}/story/7`,
      sp12: `${ROOTS.DASHBOARD}/story/8`,
      sp14: `${ROOTS.DASHBOARD}/story/9`,
      euro16: `${ROOTS.DASHBOARD}/story/10`,
      sp18: `${ROOTS.DASHBOARD}/story/11`,
      euro2020: `${ROOTS.DASHBOARD}/story/12`,
      sp2022: `${ROOTS.DASHBOARD}/story/13`,
      ligaNacija2023: `${ROOTS.DASHBOARD}/story/14`,
    },
    quizGroup: {
      root: `${ROOTS.DASHBOARD}/quizzes`,
      seven: `${ROOTS.DASHBOARD}/group/svi-kvizovi`,
      results: `${ROOTS.DASHBOARD}/quizGroup/results`,
      quiz: `${ROOTS.DASHBOARD}/quiz`,
      editQuiz: `${ROOTS.DASHBOARD}/editQuiz`,
      createQuiz: `${ROOTS.DASHBOARD}/createQuiz`,
    },
    profile: `${ROOTS.DASHBOARD}/profile`,
    voting: {
      vote: `${ROOTS.DASHBOARD}/voting`,
      editVoting: `${ROOTS.DASHBOARD}/editVoting`,
      votingResults: `${ROOTS.DASHBOARD}/votingResults`,
      createVoting: `${ROOTS.DASHBOARD}/createVoting`,
    },
  },
};
