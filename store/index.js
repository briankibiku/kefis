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
  answersResponse: {
    choices_picked: [
      {
        picked: "C",
        timeout: 0,
      },
    ],
    resp: [
      {
        id: "25564",
        question:
          "Charity Ngilu served as the Minister For Health between which years?",
        answer: "2003-2007",
        label: "C",
        session_id: "149044",
      },
    ],
  },
  trivia: [],
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
  // question & answer variables
  persistedAnswers: null,
  userAnswersPayloadSet: false,
  persistedState: null,
  alert: false,
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

  updateSignUpPhone(state, payload) {
    state.signUpPhone = payload;
  },
  updateSignUpName(state, payload) {
    state.signUpName = payload;
  },
  updateSignUpOTP(state, payload) {
    state.signUpOTP = payload;
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

  updateQuizTimeouts(state, payload) {
    state.trivia_score.timeouts = payload;
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
      `http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/get-user&username=mast&account_number=0724609783`,
    );
    return res;
  },

  startPersistance({ commit }, payload) {
    commit("updateUserAnswers", payload);
    commit("updateUserAnswersPersistance", true);
  },
  peristAuthentication({ commit }, payload) {
    commit("updateAuthentictionStatus", payload);
  },
};
