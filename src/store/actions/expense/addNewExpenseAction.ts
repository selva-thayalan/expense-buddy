const addNewExpenseAction = (payload: any) => {
    return {
        type: "AddNew",
        payload
    }
}

export default addNewExpenseAction;