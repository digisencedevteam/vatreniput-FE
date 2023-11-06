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
      euro2020: `${ROOTS.DASHBOARD}/story/10`,
      sp2022: `${ROOTS.DASHBOARD}/story/11`,
      ligaNacija2023: `${ROOTS.DASHBOARD}/story/12`,
    },
    quizGroup: {
      root: `${ROOTS.DASHBOARD}/three`,
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
