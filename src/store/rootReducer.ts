import { combineReducers } from "redux";
import userAccountReducer from "./reducers/userAccountReducer";
import splitsReducer from "./reducers/splitsReducer";
import expenseReducer from "./reducers/expenseReducer";

const rootReducer = combineReducers({
    userAccount: userAccountReducer,
    splits: splitsReducer,
    expenses: expenseReducer
});

export default rootReducer;