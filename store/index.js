export const state = () => ({
  quiz_categories: [
    {
      tag: "Music",
      photoUrl:
        "https://drive.google.com/uc?export=view&id=1F-a5Svs-YffBbu-mTDtP1uMOGQgFJAC4",
      value: "music",
    },
    {
      tag: "Politics",
      photoUrl:
        "https://drive.google.com/uc?export=view&id=1F-a5Svs-YffBbu-mTDtP1uMOGQgFJAC4",
      value: "politics",
    },
    {
      tag: "Food",
      photoUrl:
        "https://drive.google.com/uc?export=view&id=1F-a5Svs-YffBbu-mTDtP1uMOGQgFJAC4",
      value: "food",
    },
    {
      tag: "History",
      photoUrl:
        "https://drive.google.com/uc?export=view&id=1F-a5Svs-YffBbu-mTDtP1uMOGQgFJAC4",
      value: "history",
    },
  ],
  test_quiz: {
    data: [
      {
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
  trivia_score: {
    correct: 0,
    wrong: 0,
    timeouts: 0,
  },
  lastName: "",
  signUpPhone: "",
  signUpName: "",
  signUpOTP: "",
  loggedinUserName: "",
  loggedinUserPhone: "",
  mswaliId: "",
  walletBalance: "",
  userCredits: "",
  isExistingUser: false,
  // question & answer variables
  persistedAnswers: null,
  userAnswersPayloadSet: false,
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
  updatewalletBalance(state, payload) {
    state.walletBalance = payload;
  },

  updateSignUpName(state, payload) {
    state.signUpName = payload;
  },
  updateSignUpOTP(state, payload) {
    state.signUpOTP = payload;
  },
  updateloggedinUserName(state, payload) {
    state.loggedinUserName = payload;
  },
  updateloggedinUserPhone(state, payload) {
    state.loggedinUserPhone = payload;
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
  async delayFiveSeconds() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(5000);
  },
  async delayTwoSeconds() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(2000);
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
  peristUserName({ commit }, payload) {
    commit("updateloggedinUserName", payload);
  },
  persistMswaliId({ commit }, payload) {
    commit("updateMswaliId", payload);
  },
  persistwalletBalance({ commit }, payload) {
    commit("updatewalletBalance", payload);
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
};
