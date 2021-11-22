export const state = () => ({
  visitor_info: [
    {
      id: 1,
      username: "New User",
      phone: "null",
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
          "Who said 'King Kaka wewe ni mjinga, mamako ni my girlfriend'? 3",
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
  trivia: [],
  trialQuestion: [],
  profile: {},
  trivia_score: {
    correct: 0,
    wrong: 0,
    timeouts: 0,
  },
});

export const mutations = {
  updateScore(state, payload) {
    state.test_results.correct = payload;
  },

  updateQuizScore(state, payload) {
    state.trivia_score.correct = payload;
  },

  updateQuizWrongs(state, payload) {
    state.trivia_score.wrong = payload;
  },
};
