import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    key: "vuex",
    paths: [
      "userAnswersPayload",
      "isAuthenticated",
      "loggedinUserName",
      "loggedinUserPhone",
      "newUserPhone",
      "mswaliId",
      "walletBalance",
      "sessionDetails",
      "triviaQuestions",
      "signUpPhone",
      "isExistingUser",
      "userCredits",
      "canWinStatus",
      "userAnswers"
    ],
  })(store);
};
