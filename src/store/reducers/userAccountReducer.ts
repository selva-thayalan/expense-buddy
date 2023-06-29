import ActionModel from "../models/ActionModel";
import { Member } from "../../models/Member";

const selfAccountInitialState: Member = {
    firstName: "Selva",
    lastName: "thayalan",
    id: "m0",
    emailId: "selvathayalan.r@gmail.com",
    mobile: "1234567890"
}

const userAccountReducer = (state = selfAccountInitialState, action: ActionModel): Member => {
    switch(action.type){
        case "update":
            return {...state, firstName: "Thaya"};
        default:
            return state;
    }
}

export default userAccountReducer;