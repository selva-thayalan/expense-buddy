import { createStore } from 'redux';
import rootReducer from "./rootReducer";

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;