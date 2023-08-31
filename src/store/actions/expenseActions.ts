import ActionModel from "../models/ActionModel"

const addExpense = (payload: any):ActionModel => {
    return{type: "AddExpense", payload};
}

const updateExpense = (payload: any):ActionModel => {
    return{type: "UpdateExpense", payload};
}

export { addExpense, updateExpense};