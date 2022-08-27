import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    key: "vuex",
    paths: [
      "userAnswersPayload",
      "isAuthenticated",
      "loggedinUserName",
      "loggedinUserPhone",
      "loggedinUserEmail",
      "newUserPhone",
      "mswaliId",
      "walletBalance",
      "sessionDetails",
      "triviaQuestions",
      "signUpPhone",
      "isExistingUser",
      "userCredits",
      "canWinStatus",
      "userAnswers",
      "gameSubs",
      "canNotify",
      "userDetails",
      "tournamentDetails",
    ],
  })(store);
};
