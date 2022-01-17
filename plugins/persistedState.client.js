import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    key: "vuex",
    paths: [
      "userAnswersPayload",
      "isAuthenticated",
      "loggedinUserName",
      "loggedinUserPhone",
      "mswaliId",
    ],
  })(store);
};
