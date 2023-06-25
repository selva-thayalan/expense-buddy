import { Expense } from "../../models/Expense";
import { ShareType } from "../../models/ShareType";
import ActionModel from "../models/ActionModel";

const expenseInitialState: Expense[] = [
    {id: "e0", title: "Egg", time: new Date(), splitId: "g0", amount: 30, shareType: ShareType.Equal, shares: [], paidBy: "0"},
    {id: "e0", title: "Milk", time: new Date(), splitId: "g0", amount: 35, shareType: ShareType.Equal, shares: [], paidBy: "0"},
    {id: "e0", title: "Bread", time: new Date(), splitId: "g0", amount: 25, shareType: ShareType.Equal, shares: [], paidBy: "0"},
];

const expenseReducer = (state = expenseInitialState, action: ActionModel): Expense[] => {
    switch(action.type){
        default:
            return state;
    }
}

export default expenseReducer;