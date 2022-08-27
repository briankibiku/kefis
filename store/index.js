export const state = () => ({
  quiz_categories: [
    {
      tag: "Music",
      photoUrl:
        "https://drive.google.com/uc?export=view&id=1F-a5Svs-YffBbu-mTDtP1uMOGQgFJAC4",
      value: "music",
    },
  ],
  survey: [
    {
      id: 1,
      question: "How would you feel if you could no longer play mSwali?",
      choices: [
        {
          choice: "Very disappointed",
          index: "1",
        },
        {
          choice: "Somewhat disappointed",
          index: "2",
        },
        {
          choice: "Not disappointed",
          index: "3",
        },
      ],
    },
    {
      id: 2,
      question:
        "Rate your mSwali Quiz experience with 0 being the lowest and 10 the Highest",
      choices: [
        {
          choice: "0 to 3 Horrible",
          index: "1",
        },
        {
          choice: "4 to 5 Poor",
          index: "2",
        },
        {
          choice: "6 to 8 Okay",
          index: "3",
        },
        {
          choice: "9 to 10 Excellent",
          index: "4",
        },
      ],
    },
  ],
  test_quiz: {
    data: [
      {
        question_id: "1234",
        question: "Who sang the line 'Nchi ya kitu kidogo 1'?",
        choices: [
          {
            choice: "A",
            answer_text: "Stella Mwangi",
            correct: false,
          },
          {
            choice: "B",
            answer_text: "Eric Wainaina",
            correct: true,
          },
          {
            choice: "C",
            answer_text: "Wangechi",
            correct: false,
          },
          {
            choice: "D",
            answer_text: "Size 8",
            correct: false,
          },
        ],
      },
    ],
  },

  test_results: {
    correct: 0,
    wrong: 0,
    timeouts: 0,
  },
  triviaQuestions: {},
  trialQuestion: [],
  profile: {},
  userAnswersPayload: null,
  topScores: {},
  topTeams: {},
  topScoreSet: false,
  lastNameSet: false,
  canNotify: "",
  trivia_score: {
    correct: 0,
    wrong: 0,
    timeouts: 0,
  },
  lastName: "",
  newUserPhone: "",
  signUpPhone: "",
  signUpName: "",
  signUpOTP: "",
  userDetails: {
    personal: {},
    tournament: {},
  },
  tournamentDetails: {},
  loggedinUserName: "",
  loggedinUserPhone: "",
  loggedinUserEmail: "",
  mswaliId: "",
  walletBalance: "",
  userCredits: "",
  gameSubs: "",
  isExistingUser: false,
  // question & answer variables
  persistedAnswers: null,
  userAnswersPayloadSet: false,
  userAnswers: [],
  persistedState: null,
  alert: false,
  canWinStatus: false,
  sessionDetails: {},
  // variable to carry user authentication status
  isAuthenticated: false,
});

export const getters = {
  phone: (state) => {
    return state.visitor_info[0].phone;
  },

  maskedPhone: (state) => {
    const phonenumber = state.visitor_info[0].phone;
    const first4 = phonenumber.substring(0, 4);
    const last3 = phonenumber.substring(phonenumber.length - 3);
    const mask = phonenumber
      .substring(4, phonenumber.length - 3)
      .replace(/\d/g, "*");
    return first4 + mask + last3;
  },

  score: (state) => {
    return state.trivia.correct * 10;
  },

  calculteScore: (state) => {
    return state.trivia_score.correct * 10;
  },
};

export const mutations = {
  updateScore(state, payload) {
    state.test_results.correct = payload;
  },
  updatetriviaQuestions(state, payload) {
    state.triviaQuestions = payload;
  },
  updateisExistingUser(state, payload) {
    state.isExistingUser = payload;
  },
  updateSessionDetails(state, payload) {
    state.sessionDetails = payload;
  },
  updateSignUpPhone(state, payload) {
    state.signUpPhone = payload;
  },
  updateMswaliId(state, payload) {
    state.mswaliId = payload;
  },
  updateUserAnswersPayload(state, payload) {
    state.userAnswers = payload;
  },

  updatewalletBalance(state, payload) {
    state.walletBalance = payload;
  },
  updategameSubs(state, payload) {
    state.gameSubs = payload;
  },
  updateSignUpName(state, payload) {
    state.signUpName = payload;
  },
  updateSignUpOTP(state, payload) {
    state.signUpOTP = payload;
  },
  updateUserDetails(state, payload) {
    state.userDetails.personal = payload;
  },
  updateTournamentUserDetails(state, payload) {
    state.userDetails.tournament = payload;
  },
  updateTournamentDetails(state, payload) {
    state.tournamentDetails = payload;
  },
  updateloggedinUserName(state, payload) {
    state.loggedinUserName = payload;
  },
  updateloggedinUserPhone(state, payload) {
    state.loggedinUserPhone = payload;
  },
  updateloggedinUserEmail(state, payload) {
    state.loggedinUserEmail = payload;
  },
  updateQuizScore(state, payload) {
    state.trivia_score.correct = payload;
  },

  updateTopScores(state, payload) {
    state.topScores = payload;
  },
  updateTopTeams(state, payload) {
    state.topTeams = payload;
  },
  // update user ansers on state
  updateUserAnswers(state, payload) {
    state.userAnswersPayload = payload;
  },
  updateUserAnswersPersistance(state, payload) {
    state.userAnswersPayloadSet = payload;
  },

  // update authentication
  updateAuthentictionStatus(state, payload) {
    state.isAuthenticated = payload;
  },
  // update score mutations
  updateTopScoreSet(state, payload) {
    state.topScoreSet = payload;
  },
  updateQuizWrongs(state, payload) {
    state.trivia_score.wrong = payload;
  },
  updatelastNameSet(state, payload) {
    state.lastNameSet = payload;
  },
  updatecanNotify(state, payload) {
    state.canNotify = payload;
  },
  addlastName(state, payload) {
    state.lastName = payload;
  },
  updateUserCredits(state, payload) {
    state.userCredits = payload;
  },
  updateQuizTimeouts(state, payload) {
    state.trivia_score.timeouts = payload;
  },
  updateCanWinStatus(state, payload) {
    state.canWinStatus = payload;
  },
  updateNewUserPhone(state, payload) {
    state.newUserPhone = payload;
  },
  SET_STATE(state, payload) {
    state.persistedState = payload;
  },
  SET_ALERT(state, payload) {
    state.alert = payload;
  },
};

export const actions = {
  async getuserProfile() {
    let res = await this.$axios.get(
      `/apiproxy/api/get-user&username=mast&account_number=0724609783`,
    );
    return res;
  },
  async delay() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(15000);
  },
  async delayMinute() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(60000);
  },
  async delayThirtySeconds() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(30000);
  },
  async delayTwentySeconds() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(20000);
  },
  async delayFourSeconds() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(4000);
  },
  async delayFiveSeconds() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(5000);
  },
  async delayTwoSeconds() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(2000);
  },
  async delayHalfSeconds() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(500);
  },
  startPersistance({ commit }, payload) {
    commit("updateUserAnswers", payload);
    commit("updateUserAnswersPersistance", true);
  },
  peristAuthentication({ commit }, payload) {
    commit("updateAuthentictionStatus", payload);
  },
  peristUserPhone({ commit }, payload) {
    commit("updateloggedinUserPhone", payload);
  },
  peristUserEmail({ commit }, payload) {
    commit("updateloggedinUserEmail", payload);
  },
  persistuserDetails({ commit }, payload) {
    commit("updateUserDetails", payload);
  },
  persisttournamentDetails({ commit }, payload) {
    commit("updateTournamentDetails", payload);
  },
  peristUserName({ commit }, payload) {
    commit("updateloggedinUserName", payload);
  },
  peristCanNotify({ commit }, payload) {
    commit("updatecanNotify", payload);
  },
  persistMswaliId({ commit }, payload) {
    commit("updateMswaliId", payload);
  },
  persistwalletBalance({ commit }, payload) {
    commit("updatewalletBalance", payload);
  },
  persistgameSubs({ commit }, payload) {
    commit("updategameSubs", payload);
  },
  peristIsExistingUSer({ commit }, payload) {
    commit("updateisExistingUser", payload);
  },
  persistSessionDetails({ commit }, payload) {
    commit("updateSessionDetails", payload);
  },
  persistTriviaQuestions({ commit }, payload) {
    commit("updatetriviaQuestions", payload);
  },
  persistupdateSignUpPhone({ commit }, payload) {
    commit("updateSignUpPhone", payload);
  },
  persistUserCredits({ commit }, payload) {
    commit("updateUserCredits", payload);
  },
  persistCanWinStatus({ commit }, payload) {
    commit("updateCanWinStatus", payload);
  },
  persistupdateUserAnswers({ commit }, payload) {
    commit("updateUserAnswersPayload", payload);
  },
  persistupdateNewUserPhone({ commit }, payload) {
    commit("updateNewUserPhone", payload);
  },
};
