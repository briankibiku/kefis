export const state = () => ({
  userName: '',
  products: [
    {
      'id': 1,
      'name': 'Washing Soap',
      'quantity': 40,
      'price': 50
    },
    {
      'id': 2,
      'name': 'Cooking Oil',
      'quantity': 30,
      'price': 400
    },
    {
      'id': 3,
      'name': 'Sugar',
      'quantity': 30,
      'price': 170
    },
    {
      'id': 4,
      'name': 'Flour',
      'quantity': 80,
      'price': 200
    },
    {
      'id': 5,
      'name': 'Drinking Water',
      'quantity': 80,
      'price': 200
    },
  ],
  reorderedProducts: []
});

export const getters = {
  phone: (state) => {
    return state.visitor_info[0].phone;
  },

};

export const mutations = {
  updateUsername(state, payload) {
    state.userName = payload;
  },
  updateProducts(state, payload) {
    state.products = payload;
  },
  updateReorderedProducts(state, payload) {
    state.reorderedProducts.push(payload);
  },
};

export const actions = {
  startPersistance({ commit }, payload) {
    commit("updateUserAnswers", payload);
    commit("updateUserAnswersPersistance", true);
  },
  persistUsername({ commit }, payload) {
    commit("updateUsername", payload);
  },
  persistProducts({ commit }, payload) {
    commit("updateProducts", payload);
  },
  persistReorderedProducts({ commit }, payload) {
    commit("updateReorderedProducts", payload);
  },
};
