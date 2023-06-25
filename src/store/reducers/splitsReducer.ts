import { SplitType } from "../../models/Common";
import { Split } from "../../models/Split";
import ActionModel from "../models/ActionModel";

const splitsInitialState: Split[] = [
    {id:"g0",name:"Chennai Life",type:SplitType.Group, members: [], overviews: []},
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