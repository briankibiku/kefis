export const state = () => ({
  visitor_info: [
    {
      id: 1,
      username: "New User",
      phone: "+254 724 609 783",
      email: "abc@mail.com",
    },
  ],
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
      {
        question: "Who below is famous for saying 'I am NOT boarding!' 2",
        choices: [
          {
            choice: "A",
            answer_text: "Ferdinand Waititu",
            correct: false,
          },
          {
            choice: "B",
            answer_text: "Miguna Miguna",
            correct: true,
          },
          {
            choice: "C",
            answer_text: "John Githongo",
            correct: false,
          },
          {
            choice: "D",
            answer_text: "David Ndii",
            correct: false,
          },
        ],
      },
      {
        question:
          "Did Ng'ang'a say'King Kaka wewe ni mjinga, mamako ni my girlfriend'? 3",
        choices: [
          {
            choice: "A",
            answer_text: "True",
            correct: true,
          },
          {
            choice: "B",
            answer_text: "False",
            correct: false,
          },
        ],
      },

      {
        question: "1-Who was kenya first president'?4",
        choices: [
          {
            choice: "A",
            answer_text: "Pastor Ng'ang'a",
            correct: true,
          },
          {
            choice: "B",
            answer_text: "Octopizzo",
            correct: false,
          },
          {
            choice: "C",
            answer_text: "Churchill",
            correct: false,
          },
          {
            choice: "D",
            answer_text: "Khaligraph",
            correct: false,
          },
        ],
      },
      {
        question: "Who sang National Anthem'?5",
        choices: [
          {
            choice: "A",
            answer_text: "Pastor Ng'ang'a",
            correct: true,
          },
          {
            choice: "B",
            answer_text: "Octopizzo",
            correct: false,
          },
          {
            choice: "C",
            answer_text: "Churchill",
            correct: false,
          },
          {
            choice: "D",
            answer_text: "Khaligraph",
            correct: false,
          },
        ],
      },
      {
        question: "Who is kenya Oscars award winner '?6",
        choices: [
          {
            choice: "A",
            answer_text: "Pastor Ng'ang'a",
            correct: true,
          },
          {
            choice: "B",
            answer_text: "Octopizzo",
            correct: false,
          },
          {
            choice: "C",
            answer_text: "Churchill",
            correct: false,
          },
          {
            choice: "D",
            answer_text: "Khaligraph",
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
  // question & answer variables
  persistedAnswers: null,
  userAnswersPayloadSet: false,
  persistedState: null,
  alert: false,
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
    state.persistedAnswers = payload;
  },
  updateUserAnswersSet(state) {
    state.userAnswersPayloadSet = true;
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
      "http://cms.mswali.co.ke/mswali/mswali_app/backend/web/index.php?r=api/get-user&username=mast&account_number=0724609783",
    );
    return res;
  },
  switchPersistanceState({ commit }, payload) {
    commit("SET_STATE", payload);
    commit("SET_ALERT", true);
  },
  persistAnswersState({ commit }, payload) {
    commit("updateUserAnswers", payload);
    commit("updateUserAnswersSet");
  },
};
