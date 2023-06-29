import { SplitType } from "../../models/Common";
import { Split } from "../../models/Split";
import ActionModel from "../models/ActionModel";

const splitsInitialState: Split[] = [
    {id:"g0",name:"Chennai Life",type:SplitType.Group, members: [{id:"m1", lastName: "raj", firstName: "Mohan", mobile: "2345678901", emailId:"mohan@xyz.com"},{id:"m2", lastName: "", firstName: "Mariappan", mobile: "3456789012", emailId:"mari@xyz.com"}], overviews: []},
    {id:"g1",name:"Mohanraj",type:SplitType.Individual, members: [], overviews: []},
    {id:"g2",name:"Pichakara pasanga",type:SplitType.Group, members: [], overviews: []},
]

const splitsReducer = (state = splitsInitialState, action: ActionModel): Split[] => {
    switch(action.type){
        default:
            return state;
    }
}

export default splitsReducer;