import ActionModel from "../models/ActionModel"

const addExpense = (payload: any):ActionModel => {
    return{type: "Add", payload};
}

const updateExpense = (payload: any):ActionModel => {
    return{type: "Update", payload};
}

export { addExpense, updateExpense};