import { createStore, action } from "easy-peasy";

const store = createStore({
  //state
  counter: {
    value: 0, //initial value
    //functions
    increment: action((state) => {
      state.value += 1;
    }),
  },
});

export default store;
