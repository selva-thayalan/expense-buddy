import ActionModel from "../models/ActionModel"

const addGroup = (payload: any): ActionModel => {
    return {type: "AddGroup", payload};
}

export { addGroup };