import { Expense } from "../../models/Expense";
import { ShareType } from "../../models/ShareType";
import ActionModel from "../models/ActionModel";

const expenseInitialState: Expense[] = [
    {id: "e0", title: "Egg", time: new Date(), splitId: "g0", amount: 30, shareType: ShareType.Equal, shares: [{memberId: "m0", amount: 10}, {memberId: "m1", amount: 10}, {memberId: "m2", amount: 10}], paidBy: "m0"},
    {id: "e1", title: "Milk", time: new Date(), splitId: "g0", amount: 35, shareType: ShareType.Unequal, shares: [{memberId: "m0", amount: 10}, {memberId: "m1", amount: 10}, {memberId: "m2", amount: 15}], paidBy: "m1"},
    {id: "e2", title: "Bread", time: new Date(), splitId: "g0", amount: 25, shareType: ShareType.Unequal, shares: [{memberId: "m1", amount: 10}, {memberId: "m2", amount: 15}], paidBy: "m2"},
];

const expenseReducer = (state = expenseInitialState, action: ActionModel): Expense[] => {
    switch(action.type){
        case "Add":
            return [...state, action.payload];
        case "Update":
            return state.map(exp => exp.id === action.payload.id ? action.payload : exp);
        default:
            return state;
    }
}

export default expenseReducer;